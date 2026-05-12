import { CarrinhoAtualizado } from '../dto/CarrinhoAtualizado';
import { CarrinhoParaExibir } from '../dto/CarrinhoParaExibir';

export interface VisaoCarrinho {
  iniciar(): void;
  exibir(carrinho: CarrinhoParaExibir): void;
  exibirCarrinhoVazio(): void;
  alterarQuantidadeItem(carrinho: CarrinhoAtualizado): void;
  removerItem(carrinho: CarrinhoAtualizado): void;
}
