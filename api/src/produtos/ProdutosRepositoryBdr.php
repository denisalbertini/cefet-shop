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

        $ps->bindValue(1, $paginacao->getLimit(), PDO::PARAM_INT);
        $ps->bindValue(2, $paginacao->getOffset(), PDO::PARAM_INT);

        $ps->execute();

        $produtosParaHidratar = $ps->fetchAll(PDO::FETCH_CLASS, ProdutoParaHidratar::class);

        $produtos = [];

        foreach ($produtosParaHidratar as $produtoParaHidratar) {
            array_push($produtos, Produto::hidratar($produtoParaHidratar));
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

        if (!$produtoParaHidratar) {
            throw new RepositoryException(MensagemErro::PRODUTOS_REPOSITORY_NOT_FOUND);
        }

        return Produto::hidratar($produtoParaHidratar);
    }
}
