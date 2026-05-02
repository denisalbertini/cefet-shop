<?php declare(strict_types=1);

describe('Paginacao', function () {
    it(
        'deveria lançar um erro ao instancair com valores inválidos',
        function () {
            expect(function () {
                new Paginacao(0, 0);
            })->toThrow(
                FormatadorMensagem::formatarMensagemErro([
                    MensagemErro::PAGINACAO_PAGINA,
                    MensagemErro::PAGINACAO_LIMIT,
                ]),
            );
        },
    );

    it('deveria retornar os valores instanciados corretamente', function () {
        $pagina = 1;
        $limit = 2;
        $offset = 0;

        $paginacao = new Paginacao($pagina, $limit);

        expect($paginacao->getPagina())->toBe($pagina);
        expect($paginacao->getLimit())->toBe($limit);
        expect($paginacao->getOffset())->toBe($offset);
    });

    it(
        'deveria retornar o offset correto para página maior que 1',
        function () {
            $pagina = 2;
            $limit = 3;
            $offset = 3;

            $paginacao = new Paginacao($pagina, $limit);

            expect($paginacao->getOffset())->toBe($offset);
        },
    );
});
