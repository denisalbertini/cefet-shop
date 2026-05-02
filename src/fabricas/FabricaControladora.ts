import { ControladoraCarrinhos } from '../carrinhos/ControladoraCarrinhos';
import { GestorCarrinhos } from '../carrinhos/GestorCarrinhos';
import { RepositorioCarrinhosEmHttp } from '../carrinhos/RepositorioCarrinhosEmHttp';
import { ControladoraProdutos } from '../produtos/ControladoraProdutos';
import { GestorProdutos } from '../produtos/GestorProdutos';
import { RepositorioProdutosEmHttp } from '../produtos/RepositorioProdutosEmHttp';

export class FabricaControladora {
  static controladoraProdutos(): ControladoraProdutos {
    const repositorioProdutos = new RepositorioProdutosEmHttp();
    const gestorProdutos = new GestorProdutos(repositorioProdutos);

    const repositorioCarrinhos = new RepositorioCarrinhosEmHttp();
    const gestorCarrinhos = new GestorCarrinhos(repositorioCarrinhos);

    return new ControladoraProdutos(gestorProdutos, gestorCarrinhos);
  }

  static controladoraCarrinhos(): ControladoraCarrinhos {
    const repositorio = new RepositorioCarrinhosEmHttp();
    const gestor = new GestorCarrinhos(repositorio);

    return new ControladoraCarrinhos(gestor);
  }
}
