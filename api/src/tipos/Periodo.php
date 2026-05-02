<?php declare(strict_types=1);

class Periodo
{
    public int $ano;
    public int $semestre;

    public function __construct(int $ano, int $semestre)
    {
        $this->validarDados($ano, $semestre);

        $this->ano = $ano;
        $this->semestre = $semestre;
    }

    private function validarDados(int $ano, int $semestre): void
    {
        $erros = [];

        if ($ano < 2014 || $ano > (int) date('Y')) {
            array_push($erros, MensagemErro::PERIODO_ANO);
        }

        if (!in_array($semestre, [1, 2], true)) {
            array_push($erros, MensagemErro::PERIODO_SEMESTRE);
        }

        if (sizeof($erros) > 0) {
            throw new DomainException(
                FormatadorMensagem::formatarMensagemErro($erros),
            );
        }
    }

    public function getValorFormatado(): string
    {
        return "$this->ano-$this->semestre";
    }
}
