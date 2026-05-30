import { GestorCarrinhos } from './GestorCarrinhos';
import { VisaoBadgeCarrinho } from './interface/VisaoBadgeCarrinho';

export class ControladoraBadgeCarrinho {
  private gestor: GestorCarrinhos;

  constructor(private visao: VisaoBadgeCarrinho) {
    this.gestor = new GestorCarrinhos();
  }

  public async exibirQuantidadeItens(): Promise<void> {
    const quantidade = await this.gestor.buscarQuantidadeItens();

    this.visao.exibir(quantidade);
  }
}
