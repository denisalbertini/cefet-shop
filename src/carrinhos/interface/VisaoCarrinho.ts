import { CarrinhoAtualizado } from '../dto/CarrinhoAtualizado';
import { CarrinhoParaExibir } from '../dto/CarrinhoParaExibir';

export interface VisaoCarrinho {
  iniciar(): void;
  exibir(carrinho: CarrinhoParaExibir): void;
  alterarQuantidadeItem(carrinho: CarrinhoAtualizado): void;
  removerItem(carrinho: CarrinhoAtualizado): void;
  dispararCarrinhoAtualizado(): void;
  redirecionarParaCompraFinalizada(compraId: string): void;
  redirecionarParaLogin(): void;
  exibirErros(erros: string[]): void;
}
