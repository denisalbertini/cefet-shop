<?php declare(strict_types=1);

interface ComprasRepository
{
  public function registrar(Compra $compra): string;

  public function buscarPorId(string $id): Compra;

  /**
   * @return Compra[]
   */
  public function buscarPorPeriodo(Data $inicio, Data $fim): array;
}
