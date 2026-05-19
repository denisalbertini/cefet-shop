<?php declare(strict_types=1);

class ProdutosService
{
  public function __construct(private ProdutosRepository $produtosRepository) {}

  public function buscar(int $pagina, int $limit): ProdutosPaginados
  {
    $paginacao = new Paginacao($pagina, $limit);

    $produtos = $this->produtosRepository->buscar($paginacao);

    $totalProdutos = $this->produtosRepository->contar();

    $produtosParaListar = [];

    foreach ($produtos as $produto) {
      array_push($produtosParaListar, new ProdutoParaListar($produto));
    }

    return new ProdutosPaginados(
      $pagina,
      $totalProdutos,
      $limit,
      $produtosParaListar,
    );
  }

  public function buscarPorId(string $id): ProdutoParaDetalhar
  {
    $produto = $this->produtosRepository->buscarPorId($id);

    return new ProdutoParaDetalhar($produto);
  }
}
