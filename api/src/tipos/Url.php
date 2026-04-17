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
        if (!preg_match(Regex::URL, $valor)) {
            throw new DomainException(MensagemErro::URL_VALOR);
        }

        $this->valor = $valor;
    }
}
