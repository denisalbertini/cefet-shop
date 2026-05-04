<?php declare(strict_types=1);

describe('Produto', function () {
  it('deveria lançar um erro ao instanciar com valores inválidos', function () {
    expect(function () {
      new Produto(
        'ab',
        'ab',
        'ab',
        -1,
        -1,
        new Periodo(2014, 1),
        new Url('https://url.com'),
        new Cefetin(1),
      );
    })->toThrow(
      FormatadorMensagem::formatarMensagemErro([
        MensagemErro::ID,
        MensagemErro::PRODUTO_NOME,
        MensagemErro::PRODUTO_DESCRICAO,
        MensagemErro::PRODUTO_ESTOQUE,
        MensagemErro::PRODUTO_QUANTIDADE_TOTAL_VENDIDA,
      ]),
    );
  });

  it(
    'deveria lançar um erro ao instanciar com promoção que oferece menos de 5% de desconto.',
    function () {
      expect(function () {
        new Produto(
          'c4f8ebbb-bd97-47e8-8ac3-6c302df66916',
          'abc',
          'abc',
          0,
          0,
          new Periodo(2014, 1),
          new Url('https://url.com'),
          new Cefetin(1),
          new Promocao(
            'ecfa562f-69df-446a-ba60-f7279558be99',
            'abc',
            new Porcentagem(0.04),
          ),
        );
      })->toThrow(MensagemErro::PRODUTO_PROMOCAO);
    },
  );

  it(
    'deveria lançar um erro ao instanciar com promoção que oferece mais de 20% de desconto.',
    function () {
      expect(function () {
        new Produto(
          'c4f8ebbb-bd97-47e8-8ac3-6c302df66916',
          'abc',
          'abc',
          0,
          0,
          new Periodo(2014, 1),
          new Url('https://url.com'),
          new Cefetin(1),
          new Promocao(
            'ecfa562f-69df-446a-ba60-f7279558be99',
            'abc',
            new Porcentagem(0.21),
          ),
        );
      })->toThrow(MensagemErro::PRODUTO_PROMOCAO);
    },
  );

  it('deveria retornar os dados instanciados corretamente', function () {
    $id = 'c4f8ebbb-bd97-47e8-8ac3-6c302df66916';
    $nome = 'abc';
    $descricao = 'abc';
    $estoque = 0;
    $quantidadeTotalVendida = 0;
    $lancamento = new Periodo(2014, 1);
    $foto = new Url('https://url.com');
    $preco = new Cefetin(1);
    $promocao = new Promocao(
      'ecfa562f-69df-446a-ba60-f7279558be99',
      'abc',
      new Porcentagem(0.1),
    );
    $precoPromocional = new Cefetin(
      (int) ($preco->valorCentavos * (1 - $promocao->obterDesconto())),
    )->obterValorFormatado();

    $produto = new Produto(
      $id,
      $nome,
      $descricao,
      $estoque,
      $quantidadeTotalVendida,
      $lancamento,
      $foto,
      $preco,
      $promocao,
    );

    expect($produto->id)->toBe($id);
    expect($produto->nome)->toBe($nome);
    expect($produto->descricao)->toBe($descricao);
    expect($produto->estoque)->toBe($estoque);
    expect($produto->quantidadeTotalVendida)->toBe($quantidadeTotalVendida);
    expect($produto->lancamento->obterValorFormatado())->toBe(
      $lancamento->obterValorFormatado(),
    );
    expect($produto->foto->valor)->toBe($foto->valor);
    expect($produto->preco->obterValorFormatado())->toBe(
      $preco->obterValorFormatado(),
    );
    expect($produto->obterPrecoPromocional()->obterValorFormatado())->toBe(
      $precoPromocional,
    );
  });

  it('deveria aplicar promoção corretamente', function () {
    $produto = new Produto(
      'c4f8ebbb-bd97-47e8-8ac3-6c302df66916',
      'abc',
      'abc',
      0,
      0,
      new Periodo(2014, 1),
      new Url('https://url.com'),
      new Cefetin(1),
    );

    $promocao = new Promocao(
      'ecfa562f-69df-446a-ba60-f7279558be99',
      'abc',
      new Porcentagem(0.1),
    );

    $produto->aplicarPromocao($promocao);

    expect($produto->obterPrecoPromocional())->toBeTruthy();
  });

  it('deveria remover promoção corretamente', function () {
    $produto = new Produto(
      'c4f8ebbb-bd97-47e8-8ac3-6c302df66916',
      'abc',
      'abc',
      0,
      0,
      new Periodo(2014, 1),
      new Url('https://url.com'),
      new Cefetin(1),
      new Promocao(
        'ecfa562f-69df-446a-ba60-f7279558be99',
        'abc',
        new Porcentagem(0.1),
      ),
    );

    $produto->removerPromocao();

    expect($produto->obterPrecoPromocional())->toBeFalsy();
  });
});
