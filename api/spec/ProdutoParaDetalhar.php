<?php declare(strict_types=1);

describe('ProdutoParaDetalhar', function () {
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
            new Promocao('5744ddcb-82f6-4c54-b1fa-1f79ac6c7afe', 'nome', new Porcentagem(0.1)),
        );

        $produtoParaDetalhar = new ProdutoParaDetalhar($produto);

        expect($produtoParaDetalhar->id)->toBe($produto->id);
        expect($produtoParaDetalhar->foto)->toBe($produto->foto->valor);
        expect($produtoParaDetalhar->nome)->toBe($produto->nome);
        expect($produtoParaDetalhar->lancamento)->toBe($produto->lancamento->getValorFormatado());
        expect($produtoParaDetalhar->descricao)->toBe($produto->descricao);
        expect($produtoParaDetalhar->preco)->toBe($produto->preco->getValorFormatado());
        expect($produtoParaDetalhar->precoPromocional)->toBe($produto->getPrecoPromocional());
        expect($produtoParaDetalhar->estoque)->toBe($produto->estoque);
    });
});
