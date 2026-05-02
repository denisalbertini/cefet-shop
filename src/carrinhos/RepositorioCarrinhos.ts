import { CarrinhoAtualizado } from './CarrinhoAtualizado';
import { CarrinhoParaExibir } from './CarrinhoParaExibir';

export interface RepositorioCarrinhos {
    buscar(): Promise<CarrinhoParaExibir>;
    buscarQuantidadeItens(): Promise<number>;
    adicionarItem(produtoId: string, quantidade: number): Promise<void>;
    alterarQuantidadeItem(produtoId: string, quantidade: number): Promise<CarrinhoAtualizado>;
    removerItem(produtoId: string): Promise<CarrinhoAtualizado>;
}
