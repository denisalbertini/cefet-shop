import { navegarPara } from '../util/navegarPara';
import { preencherMain } from '../util/preencherMain';
import { ControladoraCarrinhos } from './ControladoraCarrinhos';
import { CarrinhoAtualizado } from './dto/CarrinhoAtualizado';
import { CarrinhoParaExibir } from './dto/CarrinhoParaExibir';
import { VisaoCarrinho } from './interface/VisaoCarrinho';

export class VisaoCarrinhoEmDom implements VisaoCarrinho {
  private controladoraCarrinhos?: ControladoraCarrinhos;

  definirControladora(controladora: ControladoraCarrinhos): void {
    this.controladoraCarrinhos = controladora;
  }

  iniciar(): void {
    this.controladoraCarrinhos?.exibir();
  }

  exibir(carrinho: CarrinhoParaExibir): void {
    if (carrinho.itens.length === 0) {
      this.exibirCarrinhoVazio();
      return;
    }

    const template = document.getElementById('item') as HTMLTemplateElement;

    const fragmento = document.createDocumentFragment();

    for (const item of carrinho.itens) {
      const li = template.content.cloneNode(true) as HTMLElement;

      const id = li.querySelector('.produto-id') as HTMLInputElement;
      const foto = li.querySelector('.foto') as HTMLImageElement;
      const nome = li.querySelector('.nome') as HTMLParagraphElement;
      const quantidade = li.querySelector('.quantidade') as HTMLInputElement;
      const subTotal = li.querySelector('.sub-total') as HTMLSpanElement;
      const botaoRemover = li.querySelector('.remover') as HTMLButtonElement;

      id.value = item.produtoId;
      foto.src = item.produtoFoto;
      nome.textContent = item.produtoNome;

      quantidade.value = item.quantidade.toString();
      quantidade.min = '1';
      quantidade.max =
        item.produtoEstoque < 10 ? item.produtoEstoque.toString() : '10';

      quantidade.addEventListener('change', (event) => {
        const input = event.target as HTMLInputElement;

        const novaQuantidade = input.value;

        this.controladoraCarrinhos?.alterarQuantidadeItem(
          item.produtoId,
          novaQuantidade,
        );
      });

      subTotal.textContent = item.subTotal;

      botaoRemover.addEventListener('click', (event) => {
        event.preventDefault();

        this.controladoraCarrinhos?.removerItem(item.produtoId);
      });

      fragmento.appendChild(li);
    }

    document.getElementById('lista')?.replaceChildren(fragmento);

    this.escreverTotal(carrinho.total);

    const botaoFinalizar = document.getElementById(
      'finalizar',
    ) as HTMLButtonElement;

    botaoFinalizar.addEventListener('click', (event) => {
      event.preventDefault();

      this.controladoraCarrinhos?.finalizarCompra();
    });
  }

  exibirCarrinhoVazio(): void {
    preencherMain('/pages/carrinho-vazio.html');
  }

  alterarQuantidadeItem(carrinho: CarrinhoAtualizado): void {
    const li = this.buscarItemLista(carrinho.produtoId);

    (li?.querySelector('.sub-total') as HTMLSpanElement).textContent =
      carrinho.subTotal;

    this.escreverTotal(carrinho.total);
  }

  removerItem(carrinho: CarrinhoAtualizado): void {
    const li = this.buscarItemLista(carrinho.produtoId);

    li?.remove();

    this.escreverTotal(carrinho.total);
  }

  private escreverTotal(total: string): void {
    (document.getElementById('total') as HTMLSpanElement).textContent = total;
  }

  private buscarItemLista(produtoId: string): HTMLElement | null {
    const inputs = document.querySelectorAll('.produto-id');

    let li: HTMLElement | null = null;

    for (const input of inputs) {
      if ((input as HTMLInputElement).value === produtoId) {
        li = input.parentElement as HTMLElement;
        break;
      }
    }

    return li;
  }

  redirecionarParaCompraFinalizada(compraId: string): void {
    location.href = `/compra/${compraId}`;
  }

  redirecionarParaLogin(): void {
    navegarPara('/login?carrinho=true');
  }

  retornarParaCarrinho(): void {
    navegarPara('/carrinho');
  }

  exibirErros(erros: string[]): void {
    const template = document.getElementById('alerta') as HTMLTemplateElement;

    const fragmento = document.createDocumentFragment();

    for (const erro of erros) {
      const alerta = template.content.cloneNode(true) as HTMLDivElement;

      const msgErro = alerta.querySelector('.msg-erro') as HTMLParagraphElement;

      msgErro.textContent = erro;

      fragmento.appendChild(alerta);
    }

    const alertas = document.getElementById('alertas');

    alertas?.replaceChildren(fragmento);

    alertas?.classList.remove('d-none');
  }
}
