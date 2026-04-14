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
            (int) ($preco->getValorCentavos() * (1 - $promocao->getDesconto())),
        )->getValorFormatado();

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

        expect($produto->getId())->toBe($id);
        expect($produto->getNome())->toBe($nome);
        expect($produto->getDescricao())->toBe($descricao);
        expect($produto->getEstoque())->toBe($estoque);
        expect($produto->getQuantidadeTotalVendida())->toBe($quantidadeTotalVendida);
        expect($produto->getLancamento())->toBe($lancamento->getValorFormatado());
        expect($produto->getFoto())->toBe($foto->getValor());
        expect($produto->getPreco())->toBe($preco->getValorFormatado());
        expect($produto->estaEmPromocao())->toBe(true);
        expect($produto->getPrecoPromocional())->toBe($precoPromocional);
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

        expect($produto->estaEmPromocao())->toBeTruthy();
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
            new Promocao('ecfa562f-69df-446a-ba60-f7279558be99', 'abc', new Porcentagem(0.1)),
        );

        $produto->removerPromocao();

        expect($produto->estaEmPromocao())->toBeFalsy();
    });
});
