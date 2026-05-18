import Chart from 'chart.js/auto';
import { ControladoraRelatorios } from './ControladoraRelatorios';
import { VisaoRelatorios } from './interface/VisaoRelatorios';
import { RelatorioTopItens } from './types/RelatorioTopItens';
import { RelatorioVendas } from './types/RelatorioVendas';

export class VisaoRelatoriosEmDom implements VisaoRelatorios {
  private controladora: ControladoraRelatorios;
  private graficoVendas: Chart | null = null;
  private graficoTopItens: Chart | null = null;

  constructor() {
    this.controladora = new ControladoraRelatorios(this);
  }

  iniciar(): void {
    const btnGerar = document.getElementById('btn-gerar') as HTMLButtonElement;

    btnGerar.addEventListener('click', () => {
      const inicio = (document.getElementById('inicio') as HTMLInputElement)
        .value;
      const fim = (document.getElementById('fim') as HTMLInputElement).value;

      this.controladora.buscarVendas(inicio, fim);
      this.controladora.buscarTopItens(inicio, fim);
    });
  }

  exibirVendas(relatorio: RelatorioVendas): void {
    const titulo = document.getElementById(
      'titulo-vendas',
    ) as HTMLHeadingElement;

    titulo.classList.remove('invisible');
    titulo.textContent = `Vendas — Total: C$ ${relatorio.totalGeral}`;

    const labels = relatorio.vendas.map((v) => v.data);
    const valores = relatorio.vendas.map((v) =>
      parseFloat(v.total.replace(',', '.')),
    );

    if (this.graficoVendas) {
      this.graficoVendas.destroy();
    }

    const ctx = document.getElementById('grafico-barras') as HTMLCanvasElement;

    this.graficoVendas = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Total (C$)',
            data: valores,
            backgroundColor: 'rgba(13, 110, 253, 0.7)',
            borderColor: 'rgba(13, 110, 253, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: { scales: { y: { beginAtZero: true } } },
    });

    const template = document.getElementById(
      'template-linha-vendas',
    ) as HTMLTemplateElement;

    const fragmento = document.createDocumentFragment();

    for (const venda of relatorio.vendas) {
      const tr = template.content.cloneNode(true) as DocumentFragment;

      const colunas = tr.querySelectorAll('td');

      colunas[0].textContent = venda.data;
      colunas[1].textContent = `C$ ${venda.total}`;

      fragmento.appendChild(tr);
    }

    const tbody = document.querySelector(
      '#tabela-vendas tbody',
    ) as HTMLTableSectionElement;

    tbody.replaceChildren(fragmento);
  }

  exibirTopItens(relatorio: RelatorioTopItens): void {
    const titulo = document.getElementById(
      'titulo-top-itens',
    ) as HTMLHeadingElement;

    titulo.classList.remove('invisible');

    const labels = relatorio.itens.map((i) => i.nomeProduto);
    const valores = relatorio.itens.map((i) => i.quantidadeVendas);

    if (this.graficoTopItens) {
      this.graficoTopItens.destroy();
    }

    const ctx = document.getElementById('grafico-pizza') as HTMLCanvasElement;

    this.graficoTopItens = new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [
          {
            data: valores,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)',
              'rgba(199, 199, 199, 0.7)',
              'rgba(83, 102, 255, 0.7)',
              'rgba(255, 99, 255, 0.7)',
              'rgba(99, 255, 132, 0.7)',
            ],
          },
        ],
      },
    });

    const template = document.getElementById(
      'template-linha-top-itens',
    ) as HTMLTemplateElement;

    const fragmento = document.createDocumentFragment();

    for (const item of relatorio.itens) {
      const tr = template.content.cloneNode(true) as DocumentFragment;

      const colunas = tr.querySelectorAll('td');

      colunas[0].textContent = item.nomeProduto;
      colunas[1].textContent = item.quantidadeVendas.toString();

      fragmento.appendChild(tr);
    }

    const tbody = document.querySelector(
      '#tabela-produtos tbody',
    ) as HTMLTableSectionElement;

    tbody.replaceChildren(fragmento);
  }
}
