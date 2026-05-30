import { ProdutoParaDetalhar } from '../dto/ProdutoParaDetalhar';

export interface VisaoDetalheProduto {
  iniciar(id: string): void;
  detalhar(produto: ProdutoParaDetalhar): void;
  dispararCarrinhoAtualizado(): void;
  exibirErro(): void;
}
