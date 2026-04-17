<?php declare(strict_types=1);

use Kahlan\Plugin\Double;

describe('ProdutosService', function () {
    beforeAll(function () {
        $this->produto = new Produto(
            'c28ace4f-59d2-4aef-888a-3cbdaaa15f36',
            'abc',
            'abc',
            0,
            0,
            new Periodo(2014, 1),
            new Url('http://placehold.co/100'),
            new Cefetin(1000),
            new Promocao('9a584336-d188-4882-91c7-a812687d4c68', 'abc', new Porcentagem(0.1)),
        );

        $repository = Double::instance([
            'implements' => [ProdutosRepository::class],
            'stubMethods' => [
                'buscar' => [$this->produto, $this->produto],
                'buscarPorId' => $this->produto,
            ],
        ]);

        $this->service = new ProdutosService($repository);
    });

    describe('listar', function () {
        it('deveria retornar um array de dtos para listar o produto', function () {
            $produtosParaListar = $this->service->listar(1, 6);

            foreach ($produtosParaListar as $p) {
                expect($p::class)->toBe(ProdutoParaListar::class);
                expect($p->id)->toBe($this->produto->id);
                expect($p->foto)->toBe($this->produto->foto->valor);
                expect($p->nome)->toBe($this->produto->nome);
                expect($p->preco)->toBe($this->produto->preco->getValorFormatado());
                expect($p->precoPromocional)->toBe($this->produto->getPrecoPromocional());
            }
        });
    });

    describe('buscarPorId', function () {
        xit('deveria retornar um dto para detalhar o produto', function () {
            $p = $this->service->buscarPorId('');

            expect($p::class)->toBe(ProdutoParaDetalhar::class);
            expect($p->id)->toBe($this->produto->id);
            expect($p->foto)->toBe($this->produto->foto->valor);
            expect($p->nome)->toBe($this->produto->nome);
            expect($p->lancamento)->toBe($this->produto->lancamento->getValorFormatado());
            expect($p->descricao)->toBe($this->produto->descricao);
            expect($p->preco)->toBe($this->produto->preco->getValorFormatado());
            expect($p->precoPromocional)->toBe($this->produto->getPrecoPromocional());
        });
    });
});
