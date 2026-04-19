import { CarrinhoParaExibir } from './CarrinhoParaExibir';

export interface RepositorioCarrinhos {
    buscar(): Promise<CarrinhoParaExibir>;
    adicionarItem(produtoId: string, quantidade: number): Promise<CarrinhoParaExibir>;
    alterarQuantidadeItem(produtoId: string, quantidade: number): Promise<CarrinhoParaExibir>;
    removerItem(produtoId: string): Promise<CarrinhoParaExibir>;
}
