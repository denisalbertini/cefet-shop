import { MENSAGEM_ERRO } from '../constantes';
import { FormatadorMensagem } from '../FormatadorMensagem';

export class ItemParaListar {
    public readonly quantidade: number;
    public readonly subTotal: string;
    public readonly produtoId: string;
    public readonly produtoFoto: string;
    public readonly produtoNome: string;

    public constructor(
        quantidade: any,
        subTotal: any,
        produtoId: any,
        produtoFoto: any,
        produtoNome: any
    ) {
        this.validarDados(quantidade, subTotal, produtoId, produtoFoto, produtoNome);

        this.quantidade = quantidade;
        this.subTotal = subTotal;
        this.produtoId = produtoId;
        this.produtoFoto = produtoFoto;
        this.produtoNome = produtoNome;
    }

    private validarDados(
        quantidade: any,
        subTotal: any,
        produtoId: any,
        produtoFoto: any,
        produtoNome: any
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

        if (erros.length > 0) {
            throw new TypeError(FormatadorMensagem.formatarMensagemErro(erros));
        }
    }
}
