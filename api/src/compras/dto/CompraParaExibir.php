<?php declare(strict_types=1);

class CompraParaExibir
{
  public int $numeroCompra;
  public string $data;
  /**
   * @var ItemParaListar[]
   */
  public array $itens;

  /**
   * @param Item[] $itens
   */
  public function __construct(Compra $compra, array $itens)
  {
    $this->numeroCompra = $compra->numeroCompra;
    $this->data = $compra->data->obterValorFormatado();
    $this->itens = [];

    foreach ($itens as $item) {
      array_push($this->itens, new ItemParaListar($item));
    }
  }
}
