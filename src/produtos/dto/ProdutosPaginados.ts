import { ProdutoParaListar } from './ProdutosParaListar';

export class ProdutosPaginados {
  public constructor(
    public readonly paginaAtual: number,
    public readonly totalPaginas: number,
    public readonly temProx: boolean,
    public readonly temAnt: boolean,
    public readonly produtos: ProdutoParaListar[],
  ) {}
}
