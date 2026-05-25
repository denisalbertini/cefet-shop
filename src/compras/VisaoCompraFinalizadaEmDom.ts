import { ControladoraCompraFinalizada } from './ControladoraCompraFinalizada';
import { VisaoCompraFinalizada } from './interface/VisaoCompraFinalizada';
import { CompraParaExibir } from './types/CompraParaExibir';

export class VisaoCompraFinalizadaEmDom implements VisaoCompraFinalizada {
  private controladora: ControladoraCompraFinalizada;

  constructor() {
    this.controladora = new ControladoraCompraFinalizada(this);
  }

  iniciar(id: string): void {
    this.controladora.exibir(id);
  }

  exibir(compra: CompraParaExibir): void {
    const numeroCompra = document.getElementById(
      'numero-compra',
    ) as HTMLSpanElement;
    const nomeUsuario = document.getElementById(
      'nome-completo',
    ) as HTMLSpanElement;
    const data = document.getElementById('data') as HTMLSpanElement;

    numeroCompra.textContent = compra.numeroCompra.toString();
    nomeUsuario.textContent = compra.nomeCompletoUsuario;
    data.textContent = compra.data;

    const template = document.getElementById('item') as HTMLTemplateElement;

    const fragmento = document.createDocumentFragment();

    for (const item of compra.itens) {
      const li = template.content.cloneNode(true) as HTMLLIElement;

      const img = li.querySelector('.foto-produto') as HTMLImageElement;
      const nomeProduto = li.querySelector('.nome-produto') as HTMLSpanElement;
      const quantidade = li.querySelector('.quantidade') as HTMLSpanElement;
      const subTotal = li.querySelector('.subtotal') as HTMLSpanElement;

      img.src = item.produtoFoto;
      nomeProduto.textContent = item.produtoNome;
      quantidade.textContent = item.quantidade.toString();
      subTotal.textContent = item.subtotal;

      fragmento.appendChild(li);
    }

    const listaItens = document.getElementById('itens')!;

    listaItens.replaceChildren(fragmento);

    const total = document.getElementById('total') as HTMLSpanElement;

    total.textContent = compra.total;

    const botaoImprimir = document.getElementById('imprimir')!;

    botaoImprimir.addEventListener('click', (event) => {
      event.preventDefault();

      window.print();
    });
  }
}
