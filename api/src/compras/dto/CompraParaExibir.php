<?php declare(strict_types=1);

class CompraParaExibir
{
  public int $numeroCompra;
  public string $nomeCompletoUsuario;
  public string $data;
  public string $total;
  /**
   * @var ItemCompraParaListar[]
   */
  public array $itens;

  public function __construct(Compra $compra)
  {
    $this->numeroCompra = $compra->numeroCompra;
    $this->nomeCompletoUsuario = $compra->usuario->obterNomeCompleto();
    $this->data = $compra->data->obterValorFormatado();
    $this->total = $compra->total->obterValorFormatado();
    $this->itens = [];

    foreach ($compra->itens as $item) {
      array_push($this->itens, new ItemCompraParaListar($item));
    }
  }
}
