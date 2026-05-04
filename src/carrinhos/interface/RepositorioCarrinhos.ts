import { CarrinhoAtualizado } from '../dto/CarrinhoAtualizado';
import { CarrinhoParaExibir } from '../dto/CarrinhoParaExibir';

export interface RepositorioCarrinhos {
  buscar(): Promise<CarrinhoParaExibir>;
  buscarQuantidadeItens(): Promise<number>;
  adicionarItem(produtoId: string, quantidade: number): Promise<number>;
  alterarQuantidadeItem(
    produtoId: string,
    quantidade: number,
  ): Promise<CarrinhoAtualizado>;
  removerItem(produtoId: string): Promise<CarrinhoAtualizado>;
}
