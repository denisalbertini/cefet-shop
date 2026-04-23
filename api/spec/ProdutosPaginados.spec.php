<?php declare(strict_types=1);

describe('ProdutosPaginados', function () {
    it('deveria lançar um erro ao instanciar com valores = 0', function () {
        expect(function () {
            new ProdutosPaginados(0, 0, true, true, []);
        })->toThrow(
            FormatadorMensagem::formatarMensagemErro([
                MensagemErro::PRODUTOS_PAGINADOS_PAGINA_ATUAL,
                MensagemErro::PRODUTOS_PAGINADOS_TOTAL_PAGINAS,
            ]),
        );
    });

    it('deveria lançar um erro ao instanciar com valores < 0', function () {
        expect(function () {
            new ProdutosPaginados(-1, -1, true, true, []);
        })->toThrow(
            FormatadorMensagem::formatarMensagemErro([
                MensagemErro::PRODUTOS_PAGINADOS_PAGINA_ATUAL,
                MensagemErro::PRODUTOS_PAGINADOS_TOTAL_PAGINAS,
            ]),
        );
    });

    it('deveria retornar os valores instanciados corretamente', function () {
        $paginaAtual = 1;
        $totalPaginas = 1;
        $temProx = false;
        $temAnt = false;
        $produtos = [];

        $produtosPaginados = new ProdutosPaginados(
            $paginaAtual,
            $totalPaginas,
            $temProx,
            $temAnt,
            $produtos,
        );

        expect($produtosPaginados->paginaAtual)->toBe($paginaAtual);
        expect($produtosPaginados->totalPaginas)->toBe($totalPaginas);
        expect($produtosPaginados->temProx)->toBe($temProx);
        expect($produtosPaginados->temAnt)->toBe($temAnt);
        expect($produtosPaginados->produtos)->toEqual($produtos);
    });
});
