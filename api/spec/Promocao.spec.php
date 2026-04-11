<?php declare(strict_types=1);

describe('Promocao', function () {
  it('deveria lançar um erro com nome de menos de 3 caracteres', function () {
    expect(function () {
      new Promocao('ab');
    })->toThrow(MensagemErro::NOME_INVALIDO_PROMOCAO);
  });

  it('deveria retornar o nome instanciado corretamente', function () {
    $nome = 'Nova Promoção';
    $promocao = new Promocao($nome);

    expect($promocao->getNome())->toBe($nome);
  });
});
