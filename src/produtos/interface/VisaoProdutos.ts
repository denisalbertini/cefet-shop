import { ProdutoParaDetalhar } from '../dto/ProdutoParaDetalhar';
import { ProdutosPaginados } from '../dto/ProdutosPaginados';

export interface VisaoProdutos {
  iniciar(): void;
  listar(produtosPaginados: ProdutosPaginados): void;
  detalhar(produto: ProdutoParaDetalhar): void;
  atualizarQuantidadeItensCarrinho(quantidade: number): void;
}
