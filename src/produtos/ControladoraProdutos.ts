import { GestorCarrinhos } from '../carrinhos/GestorCarrinhos';
import { VisaoError } from '../error/VisaoError';
import { GestorProdutos } from './GestorProdutos';
import { VisaoProdutos } from './interface/VisaoProdutos';
import { VisaoProdutosEmHtml } from './VisaoProdutosEmHtml';

export class ControladoraProdutos {
  public readonly visaoProdutos: VisaoProdutos;
  private visaoError: VisaoError;

  public constructor(
    private gestorProdutos: GestorProdutos,
    private gestorCarrinhos: GestorCarrinhos,
  ) {
    this.visaoProdutos = new VisaoProdutosEmHtml(this);
    this.visaoError = new VisaoError();
  }

  public async listar(pagina: number, limit: number): Promise<void> {
    try {
      const produtosPaginados = await this.gestorProdutos.listar(pagina, limit);

      this.visaoProdutos.listar(produtosPaginados);
    } catch (erro: any) {
      this.tratarErro(erro);
    }
  }

  public async buscarPorId(id: string): Promise<void> {
    try {
      const produto = await this.gestorProdutos.buscarPorId(id);

      this.visaoProdutos.detalhar(produto);
    } catch (erro: any) {
      this.tratarErro(erro);
    }
  }

  public adicionarAoCarrinho(produtoId: string, quantidade: string): void {
    try {
      this.gestorCarrinhos.adicionarItem(produtoId, quantidade);
    } catch (erro: any) {
      this.tratarErro(erro);
    }
  }

  private tratarErro(erro: Error): void {
    this.visaoError.exibirErro(erro);
  }
}
