import { navegarPara } from '../util/navegarPara';
import { ControladoraComprasRealizadas } from './ControladoraComprasRealizadas';
import { VisaoComprasRealizadas } from './interface/VisaoComprasRealizadas';
import { ItemCompraParaListar } from './itens-compra/dto/ItemCompraParaListar';
import { CompraParaExibir } from './types/CompraParaExibir';
import { ComprasRealizadas } from './types/ComprasRealizadas';

export class VisaoComprasRealizadasEmDom implements VisaoComprasRealizadas {
  private controladora: ControladoraComprasRealizadas;

  constructor() {
    this.controladora = new ControladoraComprasRealizadas(this);
  }

  iniciar(): void {
    this.controladora.exibir();
  }

  exibir(comprasRealizadas: ComprasRealizadas): void {
    const totalGasto = document.getElementById(
      'total-gasto',
    ) as HTMLSpanElement;

    totalGasto.textContent = comprasRealizadas.totalGasto;

    const compraTemplate = document.getElementById(
      'compra',
    ) as HTMLTemplateElement;

    const fragmentoCompras = document.createDocumentFragment();

    for (const [i, compra] of comprasRealizadas.compras.entries()) {
      fragmentoCompras.appendChild(
        this.montarCompra(compraTemplate, i, compra),
      );
    }

    const compras = document.getElementById('lista-compras')!;

    compras.replaceChildren(fragmentoCompras);
  }

  redirecionar(): void {
    navegarPara('/');
  }

  exibirVazio(): void {
    const listagem = document.getElementById('listagem-compras')!;

    listagem.classList.add('d-none');

    const alert = document.querySelector('.alert')!;

    alert.classList.remove('d-none');
  }

  private montarCompra(
    compraTemplate: HTMLTemplateElement,
    indice: number,
    compra: CompraParaExibir,
  ): HTMLElement {
    const accordionId = (indice + 1).toString();

    const accordion = compraTemplate.content.cloneNode(true) as HTMLDivElement;

    const botao = accordion.querySelector('button')!;
    const expansao = accordion.querySelector('.expansao')!;
    const total = accordion.querySelector('.total') as HTMLSpanElement;

    botao.setAttribute('data-bs-target', '#' + accordionId);
    botao.setAttribute('aria-controls', accordionId);
    botao.textContent = compra.data;

    expansao.id = accordionId;

    total.textContent = compra.total;

    const itemTemplate = document.getElementById('item') as HTMLTemplateElement;

    const fragmentoItens = document.createDocumentFragment();

    for (const item of compra.itens) {
      fragmentoItens.appendChild(this.montarItem(itemTemplate, item));
    }

    const itens = accordion.querySelector('.itens')!;

    itens.replaceChildren(fragmentoItens);

    return accordion;
  }

  private montarItem(
    itemTemplate: HTMLTemplateElement,
    item: ItemCompraParaListar,
  ): HTMLElement {
    const li = itemTemplate.content.cloneNode(true) as HTMLLIElement;

    const foto = li.querySelector('img')!;
    const nome = li.querySelector('.nome-produto') as HTMLSpanElement;
    const quantidade = li.querySelector('.quantidade') as HTMLSpanElement;
    const subtotal = li.querySelector('.subtotal') as HTMLSpanElement;

    foto.src = item.produtoFoto;
    nome.textContent = item.produtoNome;
    quantidade.textContent = item.quantidade.toString();
    subtotal.textContent = item.subtotal;

    return li;
  }
}
