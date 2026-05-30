import { EVENTOS } from '../util/constantes';
import { ControladoraBadgeCarrinho } from './ControladoraBadgeCarrinho';
import { VisaoBadgeCarrinho } from './interface/VisaoBadgeCarrinho';

export class VisaoBadgeCarrinhoEmDom implements VisaoBadgeCarrinho {
  private controladora: ControladoraBadgeCarrinho;

  constructor() {
    this.controladora = new ControladoraBadgeCarrinho(this);

    this.configurarEventos();
  }

  iniciar(): void {
    this.controladora.exibirQuantidadeItens();
  }

  exibir(quantidade: number): void {
    const badge = document.getElementById('badge') as HTMLSpanElement;

    if (quantidade !== 0) {
      badge.textContent = quantidade.toString();
      badge.classList.remove('invisible');
    } else {
      badge.classList.add('invisible');
    }
  }

  private configurarEventos(): void {
    window.addEventListener(EVENTOS.CARRINHO.ATUALIZADO, () =>
      this.controladora.exibirQuantidadeItens(),
    );
  }
}
