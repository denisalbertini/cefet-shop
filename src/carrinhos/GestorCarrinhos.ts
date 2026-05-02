import { CarrinhoAtualizado } from './dto/CarrinhoAtualizado';
import { CarrinhoParaExibir } from './dto/CarrinhoParaExibir';
import { RepositorioCarrinhos } from './interface/RepositorioCarrinhos';

export class GestorCarrinhos {
  public constructor(private repositorioCarrinhos: RepositorioCarrinhos) {}

  public buscar(): Promise<CarrinhoParaExibir> {
    return this.repositorioCarrinhos.buscar();
  }

  public buscarQuantidadeItens(): Promise<number> {
    return this.repositorioCarrinhos.buscarQuantidadeItens();
  }

  public adicionarItem(produtoId: string, quantidade: string): Promise<void> {
    return this.repositorioCarrinhos.adicionarItem(
      produtoId,
      parseInt(quantidade),
    );
  }

  public alterarQuantidadeItem(
    produtoId: string,
    quantidade: number,
  ): Promise<CarrinhoAtualizado> {
    return this.repositorioCarrinhos.alterarQuantidadeItem(
      produtoId,
      quantidade,
    );
  }

  public removerItem(produtoId: string): Promise<CarrinhoAtualizado> {
    return this.repositorioCarrinhos.removerItem(produtoId);
  }
}
