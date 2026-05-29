import { afterAll, beforeAll, describe, expect, it, Mock, vi } from 'vitest';
import { CarrinhoAtualizado } from '../src/carrinhos/dto/CarrinhoAtualizado';
import { CarrinhoParaExibir } from '../src/carrinhos/dto/CarrinhoParaExibir';
import { RepositorioCarrinhos } from '../src/carrinhos/interface/RepositorioCarrinhos';
import { RepositorioCarrinhosEmHttp } from '../src/carrinhos/RepositorioCarrinhosEmHttp';
import { RepositorioError } from '../src/error/RepositorioError';

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
          produtoEstoque: 100,
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
      fetchMock.mockReturnValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ erros: [] }),
      });

      await expect(() => repositorio.buscar()).rejects.toThrow(
        RepositorioError,
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
      fetchMock.mockReturnValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ erros: [] }),
      });

      await expect(() => repositorio.adicionarItem('', 0)).rejects.toThrow(
        RepositorioError,
      );
    });

    it('deveria executar sem erros.', async () => {
      fetchMock.mockReturnValueOnce({ ok: true, json: async () => dadosMock });

      expect(async () => {
        await repositorio.adicionarItem('', 0);
      }).not.toThrow();
    });
  });

  describe('alterarQuantidadeItem', () => {
    it('deveria lançar um erro ao não encontrar o recurso.', async () => {
      fetchMock.mockReturnValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ erros: [] }),
      });

      await expect(() =>
        repositorio.alterarQuantidadeItem('', 0),
      ).rejects.toThrow(RepositorioError);
    });

    it('deveria retornar o carrinho quando a requisição é um sucesso.', async () => {
      fetchMock.mockReturnValueOnce({ ok: true, json: async () => dadosMock });

      const carrinho = await repositorio.alterarQuantidadeItem('', 0);

      expect(carrinho).toBeInstanceOf(CarrinhoAtualizado);
    });
  });

  describe('removerItem', () => {
    it('deveria lançar um erro ao não encontrar o recurso.', async () => {
      fetchMock.mockReturnValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ erros: [] }),
      });

      await expect(() => repositorio.removerItem('')).rejects.toThrow(
        RepositorioError,
      );
    });

    it('deveria retornar o carrinho quando a requisição é um sucesso.', async () => {
      fetchMock.mockReturnValueOnce({ ok: true, json: async () => dadosMock });

      const carrinho = await repositorio.removerItem('');

      expect(carrinho).toBeInstanceOf(CarrinhoAtualizado);
    });
  });
});
