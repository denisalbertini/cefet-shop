<?php declare(strict_types=1);

class Item
{
  public int $quantidade;

  public function __construct(int $quantidade, public readonly Produto $produto)
  {
    $this->definirQuantidade($quantidade);
  }

  public function definirQuantidade(int $quantidade): void
  {
    if ($quantidade <= 0) {
      throw new DomainException(MensagemErro::ITEM_QUANTIDADE);
    }

    $estoqueProduto = $this->produto->estoque;

    if ($quantidade > $estoqueProduto) {
      $quantidade = $estoqueProduto;
    }

    if ($quantidade > 10) {
      $quantidade = 10;
    }

    $this->quantidade = $quantidade;
  }

  public function obterSubTotal(): Cefetin
  {
    $precoProduto =
      $this->produto->obterPrecoPromocional() ?? $this->produto->preco;

    $subtotal = new Cefetin($this->quantidade * $precoProduto->valorCentavos);

    return $subtotal;
  }
}
