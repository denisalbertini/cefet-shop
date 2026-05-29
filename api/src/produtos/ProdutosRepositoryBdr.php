<?php declare(strict_types=1);

class ProdutosRepositoryBdr implements ProdutosRepository
{
  public function __construct(private PDO $pdo) {}

  /**
   * @return Produto[]
   */
  public function buscar(Paginacao $paginacao): array
  {
    $ps = $this->pdo->prepare(
      'SELECT * FROM produto_para_hidratar 
       ORDER BY quantidadeTotalVendida DESC 
       LIMIT ? OFFSET ?',
    );

    $ps->bindValue(1, $paginacao->obterLimit(), PDO::PARAM_INT);
    $ps->bindValue(2, $paginacao->obterOffset(), PDO::PARAM_INT);

    $ps->execute();

    /**
     * @var ProdutoParaHidratar[]
     */
    $produtosParaHidratar = $ps->fetchAll(
      PDO::FETCH_CLASS,
      ProdutoParaHidratar::class,
    );

    $produtos = [];

    foreach ($produtosParaHidratar as $produtoParaHidratar) {
      array_push($produtos, $this->hidratar($produtoParaHidratar));
    }

    return $produtos;
  }

  public function buscarPorId(string $id): Produto
  {
    $ps = $this->pdo->prepare(
      'SELECT * FROM produto_para_hidratar 
            WHERE id = ?',
    );

    $ps->execute([$id]);

    $ps->setFetchMode(PDO::FETCH_CLASS, ProdutoParaHidratar::class);
    $produtoParaHidratar = $ps->fetch();

    if (!($produtoParaHidratar instanceof ProdutoParaHidratar)) {
      throw new HttpException(404, MensagemErro::PRODUTOS_REPOSITORY_NOT_FOUND);
    }

    return $this->hidratar($produtoParaHidratar);
  }

  public function contar(): int
  {
    /**
     * @var PDOStatement
     */
    $ps = $this->pdo->query('SELECT COUNT(*) AS total FROM produto');

    /**
     * @var int[]
     */
    $linha = $ps->fetch(PDO::FETCH_ASSOC);

    $total = $linha['total'];

    return $total;
  }

  public function atualizarPosCompra(Produto $produto): void
  {
    $ps = $this->pdo->prepare(
      'UPDATE produto SET estoque = ?, quantidade_total_vendida = ? WHERE id = ?',
    );

    $ps->execute([
      $produto->estoque,
      $produto->quantidadeTotalVendida,
      $produto->id,
    ]);
  }

  private function hidratar(ProdutoParaHidratar $produtoParaHidratar): Produto
  {
    $lancamentoDividido = explode('-', $produtoParaHidratar->lancamento);
    $lancamentoAno = (int) $lancamentoDividido[0];
    $lancamentoSemestre = (int) $lancamentoDividido[1];
    $lancamento = new Periodo($lancamentoAno, $lancamentoSemestre);

    $foto = new Url($produtoParaHidratar->foto);

    $preco = new Cefetin($produtoParaHidratar->preco);

    $promocao = null;
    $promocaoId = $produtoParaHidratar->promocaoId;
    $promocaoNome = $produtoParaHidratar->promocaoNome;
    $promocaoDesconto = $produtoParaHidratar->promocaoDesconto;

    if ($promocaoId && $promocaoNome && $promocaoDesconto) {
      $promocao = new Promocao(
        $promocaoId,
        $promocaoNome,
        new Porcentagem($promocaoDesconto),
      );
    }

    return new Produto(
      $produtoParaHidratar->id,
      $produtoParaHidratar->nome,
      $produtoParaHidratar->descricao,
      $produtoParaHidratar->estoque,
      $produtoParaHidratar->quantidadeTotalVendida,
      $lancamento,
      $foto,
      $preco,
      $promocao,
    );
  }
}
