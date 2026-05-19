<?php declare(strict_types=1);

use Kahlan\Plugin\Double;

describe('ProdutosService', function () {
  beforeEach(function () {
    $produto = new Produto(
      'c28ace4f-59d2-4aef-888a-3cbdaaa15f36',
      'abc',
      'abc',
      0,
      0,
      new Periodo(2014, 1),
      new Url('http://placehold.co/100'),
      new Cefetin(1000),
      new Promocao(
        '9a584336-d188-4882-91c7-a812687d4c68',
        'abc',
        new Porcentagem(0.1),
      ),
    );

    $repository = Double::instance([
      'implements' => [ProdutosRepository::class],
      'stubMethods' => [
        'buscar' => [$produto, $produto, $produto],
        'buscarPorId' => $produto,
        'contar' => 3,
      ],
    ]);

    $this->service = new ProdutosService($repository);
  });

  describe('buscar', function () {
    it(
      'deveria retornar o dto de produtos paginados na primeira página',
      function () {
        $produtosPaginados = $this->service->buscar(1, 2);

        expect($produtosPaginados->paginaAtual)->toBe(1);
        expect($produtosPaginados->totalPaginas)->toBe(2);
        expect($produtosPaginados->temProx)->toBe(true);
        expect($produtosPaginados->temAnt)->toBe(false);
      },
    );

    it(
      'deveria retornar o dto de produtos paginados na segunda página',
      function () {
        $produtosPaginados = $this->service->buscar(2, 2);

        expect($produtosPaginados->paginaAtual)->toBe(2);
        expect($produtosPaginados->totalPaginas)->toBe(2);
        expect($produtosPaginados->temProx)->toBe(false);
        expect($produtosPaginados->temAnt)->toBe(true);
      },
    );
  });

  describe('buscarPorId', function () {
    it('deveria retornar um dto para detalhar o produto', function () {
      $produto = $this->service->buscarPorId('');

      expect($produto)->toBeAnInstanceOf(ProdutoParaDetalhar::class);
    });
  });
});
