import { CarrinhoAtualizado } from '../dto/CarrinhoAtualizado';
import { CarrinhoParaExibir } from '../dto/CarrinhoParaExibir';

export interface VisaoCarrinhos {
    iniciar(): void;
    exibir(carrinho: CarrinhoParaExibir): void;
    exibirQuantidadeItens(quantidade: number): void;
    alterarQuantidadeItem(carrinho: CarrinhoAtualizado): void;
    removerItem(carrinho: CarrinhoAtualizado): void;
}
