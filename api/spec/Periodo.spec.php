<?php declare(strict_types=1);

describe('Periodo', function () {
    it('deveria lançar um erro ao instanciar com valores inválidos', function () {
        expect(function () {
            new Periodo(2013, 0);
        })->toThrow(
            FormatadorMensagem::formatarMensagemErro([
                MensagemErro::PERIODO_ANO,
                MensagemErro::PERIODO_SEMESTRE,
            ]),
        );
    });

    it('deveria lançar um erro ao instanciar com ano maior que o atual', function () {
        expect(function () {
            new Periodo(((int) date('Y')) + 1, 1);
        })->toThrow(MensagemErro::PERIODO_ANO);
    });

    it('deveria retornar o valor formatado ao instanciar corretamente', function () {
        $ano = 2014;
        $semestre = 2;
        $periodo = new Periodo($ano, $semestre);

        expect($periodo->getValorFormatado())->toBe("$ano-$semestre");
    });
});
