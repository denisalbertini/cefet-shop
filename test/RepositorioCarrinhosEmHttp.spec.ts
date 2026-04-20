import { afterAll, beforeAll, describe, expect, it, Mock, vi } from 'vitest';
import { CarrinhoParaExibir } from '../src/carrinhos/CarrinhoParaExibir';
import { RepositorioCarrinhos } from '../src/carrinhos/RepositorioCarrinhos';
import { RepositorioCarrinhosEmHttp } from '../src/carrinhos/RepositorioCarrinhosEmHttp';
import { MENSAGEM_ERRO } from '../src/constantes';

describe('RepositorioCarrinhosEmHttp', () => {
    let repositorio: RepositorioCarrinhos;
    let dadosMock: object;
    let fetchMock: Mock;

    beforeAll(() => {
        repositorio = new RepositorioCarrinhosEmHttp();

        dadosMock = {
            total: '100,00',
            itens: [
                {
                    quantidade: 10,
                    subTotal: '100,00',
                    produtoId: 'abc',
                    produtoFoto: 'abc',
                    produtoNome: 'abc',
                },
            ],
        };

        fetchMock = vi.fn();

        vi.stubGlobal('fetch', fetchMock);
    });

    afterAll(() => {
        vi.unstubAllGlobals();
    });

    describe('buscar', () => {
        it('deveria lançar um erro ao não encontrar o recurso.', async () => {
            fetchMock.mockReturnValueOnce({ ok: false, status: 404 });

            await expect(() => repositorio.buscar()).rejects.toThrow(
                MENSAGEM_ERRO.REPOSITORIO.NOT_FOUND
            );
        });

        it('deveria retornar o carrinho quando a requisição é um sucesso.', async () => {
            fetchMock.mockReturnValueOnce({ ok: true, json: async () => dadosMock });

            const carrinho = await repositorio.buscar();

            expect(carrinho).toBeInstanceOf(CarrinhoParaExibir);
        });
    });

    describe('adicionarItem', () => {
        it('deveria lançar um erro ao não encontrar o recurso.', async () => {
            fetchMock.mockReturnValueOnce({ ok: false, status: 404 });

            await expect(() => repositorio.adicionarItem('', 0)).rejects.toThrow(
                MENSAGEM_ERRO.REPOSITORIO.NOT_FOUND
            );
        });

        it('deveria retornar o carrinho quando a requisição é um sucesso.', async () => {
            fetchMock.mockReturnValueOnce({ ok: true, json: async () => dadosMock });

            const carrinho = await repositorio.adicionarItem('', 0);

            expect(carrinho).toBeInstanceOf(CarrinhoParaExibir);
        });
    });

    describe('alterarQuantidadeItem', () => {
        it('deveria lançar um erro ao não encontrar o recurso.', async () => {
            fetchMock.mockReturnValueOnce({ ok: false, status: 404 });

            await expect(() => repositorio.alterarQuantidadeItem('', 0)).rejects.toThrow(
                MENSAGEM_ERRO.REPOSITORIO.NOT_FOUND
            );
        });

        it('deveria retornar o carrinho quando a requisição é um sucesso.', async () => {
            fetchMock.mockReturnValueOnce({ ok: true, json: async () => dadosMock });

            const carrinho = await repositorio.alterarQuantidadeItem('', 0);

            expect(carrinho).toBeInstanceOf(CarrinhoParaExibir);
        });
    });

    describe('removerItem', () => {
        it('deveria lançar um erro ao não encontrar o recurso.', async () => {
            fetchMock.mockReturnValueOnce({ ok: false, status: 404 });

            await expect(() => repositorio.removerItem('')).rejects.toThrow(
                MENSAGEM_ERRO.REPOSITORIO.NOT_FOUND
            );
        });

        it('deveria retornar o carrinho quando a requisição é um sucesso.', async () => {
            fetchMock.mockReturnValueOnce({ ok: true, json: async () => dadosMock });

            const carrinho = await repositorio.removerItem('');

            expect(carrinho).toBeInstanceOf(CarrinhoParaExibir);
        });
    });
});
