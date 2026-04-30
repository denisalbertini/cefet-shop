import { CarrinhoAtualizado } from './CarrinhoAtualizado';
import { CarrinhoParaExibir } from './CarrinhoParaExibir';

export interface VisaoCarrinhos {
    iniciar(): void;
    exibir(carrinho: CarrinhoParaExibir): void;
    alterarQuantidadeItem(carrinho: CarrinhoAtualizado): void;
    removerItem(carrinho: CarrinhoAtualizado): void;
}
