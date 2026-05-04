<?php declare(strict_types=1);

class Url
{
  public string $valor;

  public function __construct(string $valor)
  {
    $this->definirValor($valor);
  }

  private function definirValor(string $valor): void
  {
    $this->valor = $valor;
  }
}
