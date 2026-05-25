<?php declare(strict_types=1);

interface UnidadeTransacional
{
  public function iniciar(): void;
  public function confirmar(): void;
  public function reverter(): void;
}
