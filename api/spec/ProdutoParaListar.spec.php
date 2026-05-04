<?php declare(strict_types=1);

describe('ProdutoParaListar', function () {
  it('deveria retornar os valores instanciados corretamente', function () {
    $produto = new Produto(
      'eef77196-ccab-4007-8e08-c9b0f58c6c69',
      'nome',
      'descricao',
      100,
      500,
      new Periodo(2014, 1),
      new Url('https://placehold.co/100'),
      new Cefetin(1000),
      new Promocao(
        '5744ddcb-82f6-4c54-b1fa-1f79ac6c7afe',
        'nome',
        new Porcentagem(0.1),
      ),
    );

    $produtoParaListar = new ProdutoParaListar($produto);

    expect($produtoParaListar->id)->toBe($produto->id);
    expect($produtoParaListar->foto)->toBe($produto->foto->valor);
    expect($produtoParaListar->nome)->toBe($produto->nome);
    expect($produtoParaListar->preco)->toBe(
      $produto->preco->getValorFormatado(),
    );
    expect($produtoParaListar->precoPromocional)->toBe(
      $produto->getPrecoPromocional()->getValorFormatado(),
    );
  });
});
