<?php declare(strict_types=1);

describe('Url', function () {
  it('deveria retornar o valor quando instanciado corretamente', function () {
    $valor = 'http://url.com';
    $url = new Url($valor);

    expect($url->valor)->toBe($valor);
  });
});
