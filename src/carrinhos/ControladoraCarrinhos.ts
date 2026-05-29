import { GestorCompras } from '../compras/GestorCompras';
import { TipoErroRepositorio } from '../enum/TipoErroRepositorio';
import { RepositorioError } from '../error/RepositorioError';
import { MENSAGEM_ERRO } from '../util/constantes';
import { GestorCarrinhos } from './GestorCarrinhos';
import { VisaoBadgeCarrinho } from './interface/VisaoBadgeCarrinho';
import { VisaoCarrinho } from './interface/VisaoCarrinho';

export class ControladoraCarrinhos {
  private gestorCarrinhos: GestorCarrinhos;
  private gestorCompras: GestorCompras;

  public constructor(
    private visaoCarrinho: VisaoCarrinho,
    private visaoBadgeCarrinho: VisaoBadgeCarrinho,
  ) {
    this.gestorCarrinhos = new GestorCarrinhos();
    this.gestorCompras = new GestorCompras();
  }

  public async exibir(): Promise<void> {
    const carrinho = await this.gestorCarrinhos.buscar();

    this.visaoCarrinho.exibir(carrinho);
  }

  public async exibirQuantidadeItens(): Promise<void> {
    const quantidade = await this.gestorCarrinhos.buscarQuantidadeItens();

    this.visaoBadgeCarrinho.exibir(quantidade);
  }

  public async alterarQuantidadeItem(
    produtoId: string,
    quantidade: string,
  ): Promise<void> {
    const carrinho = await this.gestorCarrinhos.alterarQuantidadeItem(
      produtoId,
      quantidade,
    );

    this.visaoCarrinho.alterarQuantidadeItem(carrinho);
  }

  public async removerItem(produtoId: string): Promise<void> {
    const carrinho = await this.gestorCarrinhos.removerItem(produtoId);

    this.visaoCarrinho.removerItem(carrinho);
    this.visaoBadgeCarrinho.decrementar();
  }

  public exibirCarrinhoVazio(): void {
    this.visaoCarrinho.exibirCarrinhoVazio();
  }

  public async finalizarCompra(): Promise<void> {
    try {
      const compraId = await this.gestorCompras.registrar();

      this.visaoCarrinho.redirecionarParaCompraFinalizada(compraId);
    } catch (error: any) {
      const erros: string[] = [];

      if (!(error instanceof RepositorioError)) {
        console.error(error);
        erros.push(MENSAGEM_ERRO.ERRO_INESPERADO);
      } else {
        erros.push(...error.erros);
      }

      switch (error.tipo) {
        case TipoErroRepositorio.DadosInvalidos:
          this.visaoCarrinho.exibirErros(erros);
          break;
        case TipoErroRepositorio.NaoAutorizado:
          this.visaoCarrinho.redirecionarParaLogin();
        default:
          break;
      }
    }
  }
}
