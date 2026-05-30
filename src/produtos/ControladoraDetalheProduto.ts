import { GestorCarrinhos } from '../carrinhos/GestorCarrinhos';
import { TipoErroRepositorio } from '../enum/TipoErroRepositorio';
import { RepositorioError } from '../error/RepositorioError';
import { GestorProdutos } from './GestorProdutos';
import { VisaoDetalheProduto } from './interface/VisaoDetalheProduto';

export class ControladoraDetalheProduto {
  private gestorProdutos: GestorProdutos;
  private gestorCarrinhos: GestorCarrinhos;

  constructor(private visao: VisaoDetalheProduto) {
    this.gestorProdutos = new GestorProdutos();
    this.gestorCarrinhos = new GestorCarrinhos();
  }

  async detalhar(id: string): Promise<void> {
    try {
      const produto = await this.gestorProdutos.buscarPorId(id);

      this.visao.detalhar(produto);
    } catch (error: any) {
      if (!(error instanceof RepositorioError)) {
        console.error(error);
        return;
      }

      switch (error.tipo) {
        case TipoErroRepositorio.NaoEncontrado:
          this.visao.exibirErro();
          break;
        default:
          break;
      }
    }
  }

  async adicionarAoCarrinho(
    produtoId: string,
    quantidade: string,
  ): Promise<void> {
    await this.gestorCarrinhos.adicionarItem(produtoId, quantidade);

    this.visao.dispararCarrinhoAtualizado();
  }
}
