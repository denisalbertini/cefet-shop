import { GestorCarrinhos } from '../carrinhos/GestorCarrinhos';
import { VisaoBadgeCarrinho } from '../carrinhos/interface/VisaoBadgeCarrinho';
import { RepositorioError } from '../error/RepositorioError';
import { GestorProdutos } from './GestorProdutos';
import { VisaoDetalheProduto } from './interface/VisaoDetalheProduto';
import { VisaoListagemProdutos } from './interface/VisaoListagemProdutos';

export class ControladoraProdutos {
  private gestorProdutos: GestorProdutos;
  private gestorCarrinhos: GestorCarrinhos;

  public constructor(
    private visaoListagemProdutos: VisaoListagemProdutos,
    private visaoDetalheProduto: VisaoDetalheProduto,
    private visaoBadgeCarrinho: VisaoBadgeCarrinho,
  ) {
    this.gestorProdutos = new GestorProdutos();
    this.gestorCarrinhos = new GestorCarrinhos();

    this.configurarVisoes();
  }

  private configurarVisoes(): void {
    this.visaoListagemProdutos.definirControladora(this);
    this.visaoDetalheProduto.definirControladora(this);
  }

  public async listar(pagina: number, limit: number): Promise<void> {
    const produtosPaginados = await this.gestorProdutos.listar(pagina, limit);

    this.visaoListagemProdutos.listar(produtosPaginados);
  }

  public async detalhar(id: string): Promise<void> {
    try {
      const produto = await this.gestorProdutos.buscarPorId(id);

      this.visaoDetalheProduto.detalhar(produto);
    } catch (erro: any) {
      if (!(erro instanceof RepositorioError)) {
        return;
      }

      switch (erro.status) {
        case 404:
          this.visaoDetalheProduto.exibirErro();
          break;
        default:
          break;
      }
    }
  }

  public async adicionarAoCarrinho(
    produtoId: string,
    quantidade: string,
  ): Promise<void> {
    const quantidadeItensCarrinho = await this.gestorCarrinhos.adicionarItem(
      produtoId,
      quantidade,
    );

    this.visaoBadgeCarrinho.atualizar(quantidadeItensCarrinho);
  }
}
