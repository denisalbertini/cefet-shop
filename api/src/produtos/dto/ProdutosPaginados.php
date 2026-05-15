<?php declare(strict_types=1);

class ProdutosPaginados extends MetadadosPaginacao
{
  /**
   * @var ProdutoParaListar[]
   */
  public readonly array $produtos;

  /**
   * @param ProdutoParaListar[] $produtos
   */
  public function __construct(
    int $paginaAtual,
    int $totalProdutos,
    int $limit,
    array $produtos,
  ) {
    parent::__construct($paginaAtual, $totalProdutos, $limit);

    $this->produtos = $produtos;
  }
}
