<?php declare(strict_types=1);

interface TransacaoRepository
{
  public function iniciar(): void;
  public function confirmar(): void;
  public function reverter(): void;
}