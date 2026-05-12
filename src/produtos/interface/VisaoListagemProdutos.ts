import { ProdutosPaginados } from '../dto/ProdutosPaginados';

export interface VisaoListagemProdutos {
  iniciar(pagina: number, limit: number): void;
  listar(produtosPaginados: ProdutosPaginados): void;
}
