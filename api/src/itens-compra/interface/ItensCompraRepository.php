<?php declare(strict_types=1);

interface ItensCompraRepository
{
  public function registrar(ItemCompra $item, string $compraId): void;

  /**
   * @return ItemCompra[]
   */
  public function buscarPorCompraId(string $id): array;
}
