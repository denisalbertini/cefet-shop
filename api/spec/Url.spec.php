<?php declare(strict_types=1);

describe('Url', function () {
    it(
        'deveria lançar um erro quando instanciado com valor inválido',
        function () {
            expect(function () {
                new Url('abc.com');
            })->toThrow(MensagemErro::URL_VALOR);
        },
    );

    it('deveria retornar o valor quando instanciado corretamente', function () {
        $valor = 'http://url.com';
        $url = new Url($valor);

        expect($url->valor)->toBe($valor);
    });
});
