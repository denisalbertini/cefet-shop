<?php declare(strict_types=1);

interface ItensRepository
{
  public function registrar(Item $item, string $compraId): void;

  /**
   * @return Item[]
   */
  public function buscarPorCompraId(string $id): array;
}
