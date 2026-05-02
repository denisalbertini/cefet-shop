import { Paginacao } from '../tipos/Paginacao';
import { ProdutoParaDetalhar } from './dto/ProdutoParaDetalhar';
import { ProdutosPaginados } from './dto/ProdutosPaginados';
import { RepositorioProdutos } from './interface/RepositorioProdutos';

export class GestorProdutos {
  public constructor(private repositorioProdutos: RepositorioProdutos) {}

  public async listar(
    pagina: number,
    limit: number,
  ): Promise<ProdutosPaginados> {
    const paginacao = new Paginacao(pagina, limit);

    return this.repositorioProdutos.listar(paginacao);
  }

  public async buscarPorId(id: string): Promise<ProdutoParaDetalhar> {
    return this.repositorioProdutos.buscarPorId(id);
  }
}
