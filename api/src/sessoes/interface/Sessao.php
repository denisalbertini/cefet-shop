<?php declare(strict_types=1);

interface Sessao
{
  public function iniciar(): void;
  public function obter(string $chave): mixed;
  public function salvar(string $chave, mixed $valor): void;
  public function destruir(): void;
}
