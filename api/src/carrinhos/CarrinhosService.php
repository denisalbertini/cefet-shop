<?php declare(strict_types=1);

class CarrinhosService
{
    public function __construct(
        private CarrinhosRepository $carrinhosRepository,
        private ProdutosRepository $produtosRepository,
    ) {}

    public function buscar(): CarrinhoParaExibir
    {
        $carrinho = $this->carrinhosRepository->buscar();

        return new CarrinhoParaExibir($carrinho);
    }

    public function adicionarItem(string $produtoId, int $quantidade): void
    {
        $produto = $this->produtosRepository->buscarPorId($produtoId);

        $item = new Item($quantidade, $produto);

        $this->carrinhosRepository->adicionar($item);
    }

    public function alterarQuantidadeItem(string $produtoId, int $quantidade): CarrinhoAtualizado
    {
        $produto = $this->produtosRepository->buscarPorId($produtoId);

        $item = new Item($quantidade, $produto);

        $carrinho = $this->carrinhosRepository->alterar($item);

        return new CarrinhoAtualizado($carrinho, $produtoId);
    }

    public function removerItem(string $produtoId): CarrinhoAtualizado
    {
        $carrinho = $this->carrinhosRepository->removerItem($produtoId);

        return new CarrinhoAtualizado($carrinho, $produtoId);
    }
}
