<?php declare(strict_types=1);

class ItemMaisVendidoParaExibir
{
  public string $nomeProduto;
  public int $quantidadeVendas;

  public function __construct(string $nomeProduto, int $quantidadeVendas)
  {
    $this->nomeProduto = $nomeProduto;
    $this->quantidadeVendas = $quantidadeVendas;
  }
}
