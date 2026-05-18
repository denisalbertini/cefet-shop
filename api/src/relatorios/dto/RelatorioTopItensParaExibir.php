<?php declare(strict_types=1);

class RelatorioTopItensParaExibir
{
  /**
   * @var ItemMaisVendidoParaExibir[]
   */
  public array $itens;

  /**
   * @param ItemMaisVendidoParaExibir[] $itens
   */
  public function __construct(array $itens)
  {
    $this->itens = $itens;
  }
}
