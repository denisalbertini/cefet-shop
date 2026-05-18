<?php declare(strict_types=1);

class RelatorioVendasParaExibir
{
  public string $totalGeral;
  /**
   * @var VendaPorDataParaExibir[]
   */
  public array $vendas;

  /**
   * @param VendaPorDataParaExibir[] $vendas
   */
  public function __construct(string $totalGeral, array $vendas)
  {
    $this->totalGeral = $totalGeral;
    $this->vendas = $vendas;
  }
}
