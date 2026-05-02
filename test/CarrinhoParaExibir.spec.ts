import { describe, expect, it } from 'vitest';
import { CarrinhoParaExibir } from '../src/carrinhos/CarrinhoParaExibir';
import { MENSAGEM_ERRO } from '../src/util/constantes';
import { FormatadorMensagem } from '../src/util/FormatadorMensagem';

describe('CarrinhoParaExibir', () => {
    it('deveria lançar um erro ao instanciar com valores inválidos', () => {
        expect(() => {
            new CarrinhoParaExibir(undefined, []);
        }).toThrow(
            FormatadorMensagem.formatarMensagemErro([MENSAGEM_ERRO.CARRINHO_PARA_EXIBIR.TOTAL])
        );
    });

    it('deveria retornar os valores instanciados corretamente', () => {
        const total = '100,00';

        const carrinhoParaExibir = new CarrinhoParaExibir(total, []);

        expect(carrinhoParaExibir.total).toBe(total);
        expect(carrinhoParaExibir.itens).toStrictEqual([]);
    });
});
