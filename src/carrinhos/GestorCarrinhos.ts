import { CarrinhoAtualizado } from './CarrinhoAtualizado';
import { CarrinhoParaExibir } from './CarrinhoParaExibir';
import { RepositorioCarrinhos } from './RepositorioCarrinhos';

export class GestorCarrinhos {
    public constructor(private repositorioCarrinhos: RepositorioCarrinhos) {}

    public buscar(): Promise<CarrinhoParaExibir> {
        return this.repositorioCarrinhos.buscar();
    }

    public adicionarItem(produtoId: string, quantidade: number): Promise<void> {
        return this.repositorioCarrinhos.adicionarItem(produtoId, quantidade);
    }

    public alterarQuantidadeItem(
        produtoId: string,
        quantidade: number
    ): Promise<CarrinhoAtualizado> {
        return this.repositorioCarrinhos.alterarQuantidadeItem(produtoId, quantidade);
    }

    public removerItem(produtoId: string): Promise<CarrinhoAtualizado> {
        return this.repositorioCarrinhos.removerItem(produtoId);
    }
}
