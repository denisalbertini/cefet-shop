<?php declare(strict_types=1);

class Cefetin
{
    private int $valorCentavos;

    public function __construct(int $valorCentavos)
    {
        $this->setValorCentavos($valorCentavos);
    }

    private function setValorCentavos(int $valor)
    {
        if ($valor < 0) {
            throw new DomainException(MensagemErro::CEFETIN_VALOR);
        }

        $this->valorCentavos = $valor;
    }

    public function getValorFormatado(): string
    {
        $valorCentavosString = (string) $this->valorCentavos;

        $parteInteira = substr($valorCentavosString, 0, -2);
        $parteDecimal = substr($valorCentavosString, -2);

        $valorFormatado = "$parteInteira,$parteDecimal";

        return $valorFormatado;
    }
}
