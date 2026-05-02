import { MENSAGEM_ERRO } from '../../../util/constantes';
import { FormatadorMensagem } from '../../../util/FormatadorMensagem';

export class ItemParaListar {
    public readonly quantidade: number;
    public readonly subTotal: string;
    public readonly produtoId: string;
    public readonly produtoFoto: string;
    public readonly produtoNome: string;
    public readonly produtoEstoque: number;

    public constructor(
        quantidade: any,
        subTotal: any,
        produtoId: any,
        produtoFoto: any,
        produtoNome: any,
        produtoEstoque: any
    ) {
        this.validarDados(
            quantidade,
            subTotal,
            produtoId,
            produtoFoto,
            produtoNome,
            produtoEstoque
        );

        this.quantidade = quantidade;
        this.subTotal = subTotal;
        this.produtoId = produtoId;
        this.produtoFoto = produtoFoto;
        this.produtoNome = produtoNome;
        this.produtoEstoque = produtoEstoque;
    }

    private validarDados(
        quantidade: any,
        subTotal: any,
        produtoId: any,
        produtoFoto: any,
        produtoNome: any,
        produtoEstoque: any
    ): void {
        const erros: string[] = [];

        if (typeof quantidade !== 'number') {
            erros.push(MENSAGEM_ERRO.ITEM_PARA_LISTAR.QUANTIDADE);
        }

        if (typeof subTotal !== 'string') {
            erros.push(MENSAGEM_ERRO.ITEM_PARA_LISTAR.SUBTOTAL);
        }

        if (typeof produtoId !== 'string') {
            erros.push(MENSAGEM_ERRO.ITEM_PARA_LISTAR.PRODUTO_ID);
        }

        if (typeof produtoFoto !== 'string') {
            erros.push(MENSAGEM_ERRO.ITEM_PARA_LISTAR.PRODUTO_FOTO);
        }

        if (typeof produtoNome !== 'string') {
            erros.push(MENSAGEM_ERRO.ITEM_PARA_LISTAR.PRODUTO_NOME);
        }

        if (typeof produtoEstoque !== 'number') {
            erros.push(MENSAGEM_ERRO.ITEM_PARA_LISTAR.PRODUTO_ESTOQUE);
        }

        if (erros.length > 0) {
            throw new TypeError(FormatadorMensagem.formatarMensagemErro(erros));
        }
    }
}
