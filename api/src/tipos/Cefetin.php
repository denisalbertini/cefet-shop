<?php declare(strict_types=1);

class Cefetin
{
  public int $valorCentavos;

  public function __construct(int $valorCentavos)
  {
    $this->setValorCentavos($valorCentavos);
  }

  private function setValorCentavos(int $valor): void
  {
    if ($valor < 0) {
      throw new DomainException(MensagemErro::CEFETIN_VALOR);
    }

    $this->valorCentavos = $valor;
  }

  public function getValorFormatado(): string
  {
    $valorCentavosString = (string) $this->valorCentavos;

    if (mb_strlen($valorCentavosString) < 3) {
      $valorCentavosString = str_pad(
        $valorCentavosString,
        3,
        '0',
        STR_PAD_LEFT,
      );
    }

    $parteInteira = substr($valorCentavosString, 0, -2);
    $parteDecimal = substr($valorCentavosString, -2);

    $valorFormatado = "$parteInteira,$parteDecimal";

    return $valorFormatado;
  }
}
