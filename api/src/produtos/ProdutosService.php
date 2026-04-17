<?php declare(strict_types=1);

class ProdutosService
{
    public function __construct(private ProdutosRepository $produtosRepository) {}

    /**
     * @return ProdutoParaListar[]
     */
    public function listar(int $pagina, int $limit): array
    {
        $paginacao = new Paginacao($pagina, $limit);

        $produtos = $this->produtosRepository->buscar($paginacao);

        $produtosParaListar = [];

        foreach ($produtos as $produto) {
            $produtoParaListar = new ProdutoParaListar(
                $produto->id,
                $produto->foto->valor,
                $produto->nome,
                $produto->preco->getValorFormatado(),
                $produto->getPrecoPromocional(),
            );

            array_push($produtosParaListar, $produtoParaListar);
        }

        return $produtosParaListar;
    }

    public function buscarPorId(string $id): ProdutoParaDetalhar
    {
        $produto = $this->produtosRepository->buscarPorId($id);

        return new ProdutoParaDetalhar(
            $produto->id,
            $produto->foto->valor,
            $produto->nome,
            $produto->lancamento->getValorFormatado(),
            $produto->descricao,
            $produto->preco->getValorFormatado(),
            $produto->getPrecoPromocional(),
        );
    }
}
