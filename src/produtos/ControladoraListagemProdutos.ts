import { GestorProdutos } from './GestorProdutos';
import { VisaoListagemProdutos } from './interface/VisaoListagemProdutos';

export class ControladoraListagemProdutos {
  private gestor: GestorProdutos;

  constructor(private visao: VisaoListagemProdutos) {
    this.gestor = new GestorProdutos();
  }

  async listar(pagina: number, limit: number): Promise<void> {
    const produtosPaginados = await this.gestor.listar(pagina, limit);

    this.visao.listar(produtosPaginados);
  }
}
