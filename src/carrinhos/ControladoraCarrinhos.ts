import { GestorCompras } from '../compras/GestorCompras';
import { TipoErroRepositorio } from '../enum/TipoErroRepositorio';
import { RepositorioError } from '../error/RepositorioError';
import { GestorCarrinhos } from './GestorCarrinhos';
import { VisaoCarrinho } from './interface/VisaoCarrinho';

export class ControladoraCarrinhos {
  private gestorCarrinhos: GestorCarrinhos;
  private gestorCompras: GestorCompras;

  public constructor(private visao: VisaoCarrinho) {
    this.gestorCarrinhos = new GestorCarrinhos();
    this.gestorCompras = new GestorCompras();
  }

  public async exibir(): Promise<void> {
    const carrinho = await this.gestorCarrinhos.buscar();

    this.visao.exibir(carrinho);
  }

  public async alterarQuantidadeItem(
    produtoId: string,
    quantidade: string,
  ): Promise<void> {
    const carrinho = await this.gestorCarrinhos.alterarQuantidadeItem(
      produtoId,
      quantidade,
    );

    this.visao.alterarQuantidadeItem(carrinho);
  }

  public async removerItem(produtoId: string): Promise<void> {
    const carrinho = await this.gestorCarrinhos.removerItem(produtoId);

    this.visao.removerItem(carrinho);
    this.visao.dispararCarrinhoAtualizado();
  }

  public async finalizarCompra(): Promise<void> {
    try {
      const compraId = await this.gestorCompras.registrar();

      this.visao.redirecionarParaCompraFinalizada(compraId);
    } catch (error: any) {
      if (!(error instanceof RepositorioError)) {
        console.error(error);
        return;
      }

      switch (error.tipo) {
        case TipoErroRepositorio.DadosInvalidos:
          this.visao.exibirErros(error.erros);
          this.visao.dispararCarrinhoAtualizado();
          break;
        case TipoErroRepositorio.NaoAutorizado:
          this.visao.redirecionarParaLogin();
        default:
          break;
      }
    }
  }
}
