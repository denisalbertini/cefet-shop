<?php declare(strict_types=1);

class Carrinho
{
  /**
   * @param Item[] $itens
   */
  public function __construct(public array $itens) {}

  public function adicionarItem(Item $item): void
  {
    array_unshift($this->itens, $item);
  }

  public function substituirItem(int $indice, Item $novoItem): void
  {
    $this->itens[$indice] = $novoItem;
  }

  public function removerItem(string $produtoId): void
  {
    foreach ($this->itens as $indice => $item) {
      if ($item->produto->id === $produtoId) {
        array_splice($this->itens, $indice, 1);
        break;
      }
    }
  }

  public function obterTotal(): Cefetin
  {
    $total = 0;

    foreach ($this->itens as $item) {
      $total += $item->obterSubTotal()->valorCentavos;
    }

    return new Cefetin($total);
  }

  public function obterIndiceItem(string $produtoId): int|null
  {
    $indice = null;

    foreach ($this->itens as $i => $item) {
      if ($item->produto->id === $produtoId) {
        $indice = (int) $i;
        break;
      }
    }

    return $indice;
  }

  public function esvaziar(): void
  {
    array_splice($this->itens, 0);
  }
}
