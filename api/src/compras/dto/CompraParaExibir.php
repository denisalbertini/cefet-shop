<?php declare(strict_types=1);

class CompraParaExibir
{
  public int $numeroCompra;
  public string $nomeCompletoUsuario;
  public string $data;
  public string $total;
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
    $this->nomeCompletoUsuario = $compra->usuario->obterNomeCompleto();
    $this->data = $compra->data->obterValorFormatado();
    $this->total = $compra->total->obterValorFormatado();
    $this->itens = [];

    foreach ($itens as $item) {
      array_push($this->itens, new ItemParaListar($item));
    }
  }
}
