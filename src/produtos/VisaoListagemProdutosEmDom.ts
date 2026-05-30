import { VISAO_PRODUTOS } from '../util/constantes';
import { navegarPara } from '../util/navegarPara';
import { ControladoraListagemProdutos } from './ControladoraListagemProdutos';
import { ProdutosPaginados } from './dto/ProdutosPaginados';
import { ProdutoParaListar } from './dto/ProdutosParaListar';
import { VisaoListagemProdutos } from './interface/VisaoListagemProdutos';

export class VisaoListagemProdutosEmDom implements VisaoListagemProdutos {
  private controladora: ControladoraListagemProdutos;

  constructor() {
    this.controladora = new ControladoraListagemProdutos(this);
  }

  iniciar(
    pagina: number = 1,
    limit: number = VISAO_PRODUTOS.PRODUTOS_POR_PAGINA,
  ): void {
    this.controladora.listar(pagina, limit);
  }

  listar(produtosPaginados: ProdutosPaginados): void {
    const ancoraCarrinho = document.getElementById(
      'carrinho',
    ) as HTMLAnchorElement;

    ancoraCarrinho.classList.remove('invisible');

    this.listarProdutos(produtosPaginados.produtos);

    this.listarPaginas(
      produtosPaginados.totalPaginas,
      produtosPaginados.paginaAtual,
    );

    this.configurarPaginacao(
      produtosPaginados.paginaAtual,
      produtosPaginados.temAnt,
      produtosPaginados.temProx,
    );
  }

  private listarProdutos(produtos: ProdutoParaListar[]): void {
    const cardTemplate = document.getElementById('card') as HTMLTemplateElement;

    const fragmentoCards = document.createDocumentFragment();

    for (const produto of produtos) {
      const href = `/produto/${produto.id}`;

      const col = cardTemplate.content.cloneNode(true) as HTMLDivElement;

      const id = col.querySelector('.produto-id') as HTMLInputElement;
      const img = col.querySelector('.foto') as HTMLImageElement;
      const ancoraImg = img.parentElement as HTMLAnchorElement;
      const nome = col.querySelector('.nome') as HTMLHeadingElement;
      const ancoraNome = nome.parentElement as HTMLAnchorElement;
      const precoSemDesconto = col.querySelector(
        '.preco-sem-desconto',
      ) as HTMLSpanElement;
      const preco = col.querySelector('.preco') as HTMLSpanElement;
      const botaoDetalhes = col.querySelector('button') as HTMLButtonElement;

      id.value = produto.id;
      img.src = produto.foto;
      ancoraImg.href = href;
      nome.textContent = produto.nome;
      ancoraNome.href = href;

      if (produto.precoPromocional) {
        precoSemDesconto.textContent = produto.preco;
        precoSemDesconto.classList.add('text-decoration-line-through');
        precoSemDesconto.parentElement!.classList.add(
          'text-decoration-line-through',
        );

        preco.textContent = produto.precoPromocional;
      } else {
        precoSemDesconto.parentElement!.classList.add('invisible');

        preco.textContent = produto.preco;
      }

      botaoDetalhes?.addEventListener('click', (event) => {
        event.preventDefault();

        navegarPara(href);
      });

      fragmentoCards.appendChild(col);
    }

    document.getElementById('listagem')?.replaceChildren(fragmentoCards);
  }

  private listarPaginas(totalPaginas: number, paginaAtual: number): void {
    const paginaTemplate = document.getElementById(
      'pagina',
    ) as HTMLTemplateElement;

    const fragmentoPaginas = document.createDocumentFragment();

    for (let i = 1; i <= totalPaginas; i++) {
      const pageItem = paginaTemplate.content.cloneNode(true)
        .firstChild as HTMLLIElement;
      const pageLink = pageItem.querySelector('a') as HTMLAnchorElement;

      if (i === paginaAtual) {
        pageItem.classList.add('active');
      }

      pageLink.textContent = i.toString();
      pageLink.href = `?pagina=${i}&limit=${VISAO_PRODUTOS.PRODUTOS_POR_PAGINA}`;

      fragmentoPaginas.appendChild(pageItem);
    }

    const paginasNumeradas = document.querySelectorAll('.pagina-numerada');

    for (const pagina of paginasNumeradas) {
      pagina.remove();
    }

    document.getElementById('anterior')?.after(fragmentoPaginas);
  }

  private configurarPaginacao(
    paginaAtual: number,
    temAnt: boolean,
    temProx: boolean,
  ): void {
    const pageItemAnt = document.getElementById('anterior') as HTMLLIElement;

    if (temAnt) {
      pageItemAnt.classList.remove('disabled');

      const pageLinkAnt = pageItemAnt?.querySelector('a') as HTMLAnchorElement;

      pageLinkAnt.href = `?pagina=${paginaAtual - 1}&limit=${VISAO_PRODUTOS.PRODUTOS_POR_PAGINA}`;
    } else {
      pageItemAnt.classList.add('disabled');
    }

    const pageItemProx = document.getElementById('proximo') as HTMLLIElement;

    if (temProx) {
      pageItemProx.classList.remove('disabled');

      const pageLinkProx = pageItemProx?.querySelector(
        'a',
      ) as HTMLAnchorElement;

      pageLinkProx.href = `?pagina=${paginaAtual + 1}&limit=${VISAO_PRODUTOS.PRODUTOS_POR_PAGINA}`;
    } else {
      pageItemProx.classList.add('disabled');
    }
  }
}
