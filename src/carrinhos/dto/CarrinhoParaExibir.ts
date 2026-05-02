import { MENSAGEM_ERRO } from '../../util/constantes';
import { FormatadorMensagem } from '../../util/FormatadorMensagem';
import { ItemParaListar } from '../itens/dto/ItemParaListar';

export class CarrinhoParaExibir {
    public readonly total: string;
    public readonly itens: ItemParaListar[];

    public constructor(total: any, itens: ItemParaListar[]) {
        this.validarDados(total);

        this.total = total;
        this.itens = itens;
    }

    private validarDados(total: any): void {
        const erros: string[] = [];

        if (typeof total !== 'string') {
            erros.push(MENSAGEM_ERRO.CARRINHO_PARA_EXIBIR.TOTAL);
        }

        if (erros.length > 0) {
            throw new TypeError(FormatadorMensagem.formatarMensagemErro(erros));
        }
    }
}
