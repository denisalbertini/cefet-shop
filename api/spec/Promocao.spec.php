<?php declare(strict_types=1);

describe('Promocao', function () {
    it('deveria lançar um erro quando instanciado com valores inválidos', function () {
        expect(function () {
            new Promocao('ab', 'ab', new Porcentagem(1));
        })->toThrow(
            FormatadorMensagem::formatarMensagemErro([
                MensagemErro::ID,
                MensagemErro::PROMOCAO_VALOR,
            ]),
        );
    });

    it('deveria retornar os valores instanciados corretamente', function () {
        $id = 'ecfa562f-69df-446a-ba60-f7279558be99';
        $nome = 'Nova Promoção';
        $promocao = new Promocao($id, $nome, new Porcentagem(1));

        expect($promocao->getId())->toBe($id);
        expect($promocao->getNome())->toBe($nome);
    });
});
