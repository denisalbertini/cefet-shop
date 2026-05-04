<?php declare(strict_types=1);

class Porcentagem
{
  public float $valor;

  public function __construct(float $valor)
  {
    $this->setValor($valor);
  }

  private function setValor(float $valor): void
  {
    if ($valor <= 0 || $valor > 100) {
      throw new DomainException(MensagemErro::PORCENTAGEM_VALOR);
    }

    $this->valor = $valor;
  }
}
