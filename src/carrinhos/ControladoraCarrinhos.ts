import { GestorCarrinhos } from './GestorCarrinhos';
import { VisaoBadgeCarrinho } from './interface/VisaoBadgeCarrinho';
import { VisaoCarrinho } from './interface/VisaoCarrinho';

export class ControladoraCarrinhos {
  private gestorCarrinhos: GestorCarrinhos;

  public constructor(
    private visaoCarrinho: VisaoCarrinho,
    private visaoBadgeCarrinho: VisaoBadgeCarrinho,
  ) {
    this.gestorCarrinhos = new GestorCarrinhos();
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
}
