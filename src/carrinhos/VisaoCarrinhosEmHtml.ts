import { ControladoraCarrinhos } from './ControladoraCarrinhos';
import { CarrinhoAtualizado } from './dto/CarrinhoAtualizado';
import { CarrinhoParaExibir } from './dto/CarrinhoParaExibir';
import { VisaoCarrinhos } from './interface/VisaoCarrinhos';

export class VisaoCarrinhosEmHtml implements VisaoCarrinhos {
  public constructor(private controladoraCarrinhos: ControladoraCarrinhos) {}

  iniciar(): void {
    this.controladoraCarrinhos.exibir();
  }

  exibir(carrinho: CarrinhoParaExibir): void {
    const ancoraCarrinho = document.getElementById(
      'carrinho',
    ) as HTMLAnchorElement;
    ancoraCarrinho.classList.add('invisible');

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

        this.controladoraCarrinhos.alterarQuantidadeItem(
          item.produtoId,
          novaQuantidade,
        );
      });

      subTotal.textContent = item.subTotal;

      botaoRemover.addEventListener('click', (event) => {
        event.preventDefault();

        this.controladoraCarrinhos.removerItem(item.produtoId);
      });

      fragmento.appendChild(li);
    }

    document.getElementById('lista')?.replaceChildren(fragmento);

    this.escreverTotal(carrinho.total);
  }

  exibirQuantidadeItens(quantidade: number): void {
    const badge = document.getElementById('badge') as HTMLSpanElement;

    if (quantidade !== 0) {
      badge.textContent = quantidade.toString();
      badge.classList.remove('invisible');
    }
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

    this.decrementarValorBadgeCarrinho();
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

  private decrementarValorBadgeCarrinho(): void {
    const badge = document.getElementById('badge') as HTMLSpanElement;

    const valor = parseInt(badge.textContent);
    const novoValor = valor - 1;

    badge.textContent = novoValor.toString();

    if (novoValor === 0) {
      badge.classList.add('invisible');
      this.exibirCarrinhoVazio();
    }
  }

  private async exibirCarrinhoVazio(): Promise<void> {
    const main = document.querySelector('main')!;

    const res = await fetch('/pages/carrinho-vazio.html');

    if (!res.ok) {
      console.log('ué');
      return;
    }

    main.innerHTML = await res.text();
  }
}
