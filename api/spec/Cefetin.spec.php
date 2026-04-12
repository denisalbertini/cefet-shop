<?php declare(strict_types=1);

describe('Cefetin', function () {
    it('deveria lançar um erro ao instanciar com valor negativo', function () {
        expect(function () {
            new Cefetin(-1);
        })->toThrow(MensagemErro::CEFETIN_VALOR);
    });

    it('deveria retornar o valor formatado corretamente', function () {
        $cefetin = new Cefetin(10453);

        expect($cefetin->getValorFormatado())->toBe('104,53');
    });
});
