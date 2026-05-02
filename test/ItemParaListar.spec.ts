import { describe, expect, it } from 'vitest';
import { ItemParaListar } from '../src/carrinhos/ItemParaListar';
import { MENSAGEM_ERRO } from '../src/util/constantes';
import { FormatadorMensagem } from '../src/util/FormatadorMensagem';

describe('ItemParaListar', () => {
    it('deveria lançar um erro ao instanciar com valores inválidos', () => {
        expect(() => {
            new ItemParaListar(undefined, undefined, undefined, undefined, undefined, undefined);
        }).toThrow(
            FormatadorMensagem.formatarMensagemErro([
                MENSAGEM_ERRO.ITEM_PARA_LISTAR.QUANTIDADE,
                MENSAGEM_ERRO.ITEM_PARA_LISTAR.SUBTOTAL,
                MENSAGEM_ERRO.ITEM_PARA_LISTAR.PRODUTO_ID,
                MENSAGEM_ERRO.ITEM_PARA_LISTAR.PRODUTO_FOTO,
                MENSAGEM_ERRO.ITEM_PARA_LISTAR.PRODUTO_NOME,
                MENSAGEM_ERRO.ITEM_PARA_LISTAR.PRODUTO_ESTOQUE,
            ])
        );
    });

    it('deveria retornar os valores instanciados corretamente', () => {
        const quantidade = 10;
        const subTotal = '100';
        const produtoId = 'abc';
        const produtoFoto = 'abc';
        const produtoNome = 'abc';
        const produtoEstoque = 0;

        const itemParaListar = new ItemParaListar(
            quantidade,
            subTotal,
            produtoId,
            produtoFoto,
            produtoNome,
            produtoEstoque
        );

        expect(itemParaListar.quantidade).toBe(quantidade);
        expect(itemParaListar.subTotal).toBe(subTotal);
        expect(itemParaListar.produtoId).toBe(produtoId);
        expect(itemParaListar.produtoFoto).toBe(produtoFoto);
        expect(itemParaListar.produtoNome).toBe(produtoNome);
        expect(itemParaListar.produtoEstoque).toBe(produtoEstoque);
    });
});
