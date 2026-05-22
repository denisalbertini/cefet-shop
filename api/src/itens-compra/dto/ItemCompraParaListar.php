<?php declare(strict_types=1);

class ItemCompraParaListar
{
  public readonly int $quantidade;
  public readonly string $subtotal;
  public readonly string $produtoFoto;
  public readonly string $produtoNome;

  public function __construct(ItemCompra $item)
  {
    $this->quantidade = $item->quantidade;
    $this->subtotal = $item->subtotal->obterValorFormatado();
    $this->produtoFoto = $item->produto->foto->valor;
    $this->produtoNome = $item->produto->nome;
  }
}
