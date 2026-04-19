import { describe, expect, it } from 'vitest';
import { ItemParaListar } from '../carrinhos/ItemParaListar';
import { MENSAGEM_ERRO } from '../constantes';
import { FormatadorMensagem } from '../FormatadorMensagem';

describe('ItemParaListar', () => {
    it('deveria lançar um erro ao instanciar com valores inválidos', () => {
        expect(() => {
            new ItemParaListar(undefined, undefined, undefined, undefined, undefined);
        }).toThrow(
            FormatadorMensagem.formatarMensagemErro([
                MENSAGEM_ERRO.ITEM_PARA_LISTAR.QUANTIDADE,
                MENSAGEM_ERRO.ITEM_PARA_LISTAR.SUBTOTAL,
                MENSAGEM_ERRO.ITEM_PARA_LISTAR.PRODUTO_ID,
                MENSAGEM_ERRO.ITEM_PARA_LISTAR.PRODUTO_FOTO,
                MENSAGEM_ERRO.ITEM_PARA_LISTAR.PRODUTO_NOME,
            ])
        );
    });

    it('deveria retornar os valores instanciados corretamente', () => {
        const quantidade = 10;
        const subTotal = '100';
        const produtoId = 'abc';
        const produtoFoto = 'abc';
        const produtoNome = 'abc';

        const itemParaListar = new ItemParaListar(
            quantidade,
            subTotal,
            produtoId,
            produtoFoto,
            produtoNome
        );

        expect(itemParaListar.quantidade).toBe(quantidade);
        expect(itemParaListar.subTotal).toBe(subTotal);
        expect(itemParaListar.produtoId).toBe(produtoId);
        expect(itemParaListar.produtoFoto).toBe(produtoFoto);
        expect(itemParaListar.produtoNome).toBe(produtoNome);
    });
});
