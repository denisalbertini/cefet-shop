import { CarrinhoAtualizado } from './dto/CarrinhoAtualizado';
import { CarrinhoParaExibir } from './dto/CarrinhoParaExibir';
import { RepositorioCarrinhos } from './interface/RepositorioCarrinhos';
import { RepositorioCarrinhosEmHttp } from './RepositorioCarrinhosEmHttp';

export class GestorCarrinhos {
  public constructor(
    private repositorioCarrinhos: RepositorioCarrinhos = new RepositorioCarrinhosEmHttp(),
  ) {}

  public buscar(): Promise<CarrinhoParaExibir> {
    return this.repositorioCarrinhos.buscar();
  }

  public buscarQuantidadeItens(): Promise<number> {
    return this.repositorioCarrinhos.buscarQuantidadeItens();
  }

  public adicionarItem(produtoId: string, quantidade: string): Promise<number> {
    return this.repositorioCarrinhos.adicionarItem(
      produtoId,
      parseInt(quantidade),
    );
  }

  public alterarQuantidadeItem(
    produtoId: string,
    quantidade: string,
  ): Promise<CarrinhoAtualizado> {
    return this.repositorioCarrinhos.alterarQuantidadeItem(
      produtoId,
      parseInt(quantidade),
    );
  }

  public removerItem(produtoId: string): Promise<CarrinhoAtualizado> {
    return this.repositorioCarrinhos.removerItem(produtoId);
  }
}
