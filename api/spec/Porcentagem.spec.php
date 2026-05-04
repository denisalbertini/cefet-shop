<?php declare(strict_types=1);

describe('Porcentagem', function () {
  it('deveria lançar um erro ao instanciar com valor 0', function () {
    expect(function () {
      new Porcentagem(0);
    })->toThrow(MensagemErro::PORCENTAGEM_VALOR);
  });

  it('deveria lançar um erro ao instanciar com valor negativo', function () {
    expect(function () {
      new Porcentagem(-1);
    })->toThrow(MensagemErro::PORCENTAGEM_VALOR);
  });

  it(
    'deveria lançar um erro ao instanciar com valor maior que 100',
    function () {
      expect(function () {
        new Porcentagem(101);
      })->toThrow(MensagemErro::PORCENTAGEM_VALOR);
    },
  );

  it('deveria devolver o valor instanciado corretamente', function () {
    $valor = 14.55;
    $porcentagem = new Porcentagem($valor);

    expect($porcentagem->valor)->toBe($valor);
  });
});
