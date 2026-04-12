<?php declare(strict_types=1);

class Porcentagem
{
    private float $valor;

    public function __construct(float $valor)
    {
        $this->setValor($valor);
    }

    public function getValor()
    {
        return $this->valor;
    }

    private function setValor(float $valor)
    {
        if ($valor <= 0 || $valor > 100) {
            throw new DomainException(MensagemErro::PORCENTAGEM_VALOR);
        }

        $this->valor = $valor;
    }
}
