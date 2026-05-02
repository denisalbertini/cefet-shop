import { Paginacao } from '../../tipos/Paginacao';
import { ProdutoParaDetalhar } from '../dto/ProdutoParaDetalhar';
import { ProdutosPaginados } from '../dto/ProdutosPaginados';

export interface RepositorioProdutos {
  listar(paginacao: Paginacao): Promise<ProdutosPaginados>;
  buscarPorId(id: string): Promise<ProdutoParaDetalhar>;
}
