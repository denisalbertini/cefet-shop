<?php declare(strict_types=1);

class Url
{
  public string $valor;

  public function __construct(string $valor)
  {
    $this->setValor($valor);
  }

  private function setValor(string $valor): void
  {
    $this->valor = $valor;
  }
}
