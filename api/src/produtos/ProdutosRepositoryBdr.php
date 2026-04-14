<?php declare(strict_types=1);

class ProdutosRepositoryBdr implements ProdutosRepository
{
    public function __construct(private PDO $pdo) {}

    public function buscar(Paginacao $paginacao): array
    {
        $ps = $this->pdo->prepare(
            'SELECT produto.*, promocao.nome AS promocao_nome, promocao.desconto AS promocao_desconto 
            FROM produto LEFT JOIN promocao ON produto.promocao_id = promocao.id 
            ORDER BY produto.quantidade_total_vendida DESC 
            LIMIT ? OFFSET ?',
        );

        $ps->bindValue(1, $paginacao->getLimit(), PDO::PARAM_INT);
        $ps->bindValue(2, $paginacao->getOffset(), PDO::PARAM_INT);

        $ps->execute();

        $linhas = $ps->fetchAll();

        $produtos = [];

        foreach ($linhas as $linha) {
            array_push($produtos, Produto::hidratar($linha));
        }

        return $produtos;
    }

    public function buscarPorId(string $id): Produto
    {
        $ps = $this->pdo->prepare(
            'SELECT produto.*, promocao.nome AS promocao_nome, promocao.desconto AS promocao_desconto 
            FROM produto LEFT JOIN promocao ON produto.promocao_id = promocao.id 
            WHERE produto.id = ?',
        );

        $ps->execute([$id]);

        $linha = $ps->fetch();

        return Produto::hidratar($linha);
    }
}
