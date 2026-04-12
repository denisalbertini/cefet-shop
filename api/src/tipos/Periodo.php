<?php declare(strict_types=1);

class Periodo
{
    private int $ano;
    private int $semestre;

    public function __construct(int $ano, int $semestre)
    {
        $this->validarDados($ano, $semestre);

        $this->ano = $ano;
        $this->semestre = $semestre;
    }

    private function validarDados(int $ano, int $semestre)
    {
        $erros = [];

        if ($ano < 2014 || $ano > (int) date('Y')) {
            array_push($erros, MensagemErro::PERIODO_ANO);
        }

        if ($semestre <= 0 || $semestre > 20) {
            array_push($erros, MensagemErro::PERIODO_SEMESTRE);
        }

        if (sizeof($erros) > 0) {
            throw new DomainException(
                array_reduce($erros, function ($carry, $item) {
                    if (!$carry) {
                        return $item;
                    }

                    return $carry . PHP_EOL . $item;
                }),
            );
        }
    }

    public function getValorFormatado()
    {
        return "$this->ano.$this->semestre";
    }
}
