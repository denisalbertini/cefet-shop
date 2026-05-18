<?php declare(strict_types=1);

interface RelatoriosRepository
{
  /**
   * @return VendaPorDataParaHidratar[]
   */
  public function buscarVendasPorPeriodo(Data $inicio, Data $fim): array;

  /**
   * @return ItemMaisVendidoParaHidratar[]
   */
  public function buscarTopItensPorPeriodo(Data $inicio, Data $fim): array;
}
