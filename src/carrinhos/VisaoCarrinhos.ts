import { CarrinhoParaExibir } from './CarrinhoParaExibir';

export interface VisaoCarrinhos {
    iniciar(): void;
    exibir(carrinho: CarrinhoParaExibir): void;
    alterarQuantidadeItem(carrinho: CarrinhoParaExibir): void;
    removerItem(carrinho: CarrinhoParaExibir): void;
}
