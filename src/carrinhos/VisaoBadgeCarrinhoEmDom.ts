import { ControladoraCarrinhos } from './ControladoraCarrinhos';
import { VisaoBadgeCarrinho } from './interface/VisaoBadgeCarrinho';

export class VisaoBadgeCarrinhoEmDom implements VisaoBadgeCarrinho {
  private controladoraCarrinhos?: ControladoraCarrinhos;

  definirControladora(controladoraCarrinhos: ControladoraCarrinhos): void {
    this.controladoraCarrinhos = controladoraCarrinhos;
  }

  iniciar(): void {
    this.controladoraCarrinhos?.exibirQuantidadeItens();
  }

  exibir(quantidade: number): void {
    const badge = document.getElementById('badge') as HTMLSpanElement;

    if (quantidade !== 0) {
      badge.textContent = quantidade.toString();
      badge.classList.remove('invisible');
    }
  }

  atualizar(quantidade: number): void {
    const badge = document.getElementById('badge') as HTMLSpanElement;

    badge.textContent = quantidade.toString();

    if (quantidade === 1) {
      badge.classList.remove('invisible');
    }
  }

  decrementar(): void {
    const badge = document.getElementById('badge') as HTMLSpanElement;

    const valor = parseInt(badge.textContent);
    const novoValor = valor - 1;

    badge.textContent = novoValor.toString();

    if (novoValor === 0) {
      badge.classList.add('invisible');

      this.controladoraCarrinhos?.exibirCarrinhoVazio();
    }
  }
}
