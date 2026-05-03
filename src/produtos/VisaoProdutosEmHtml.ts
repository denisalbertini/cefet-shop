import { ControladoraProdutos } from './ControladoraProdutos';
import { ProdutoParaDetalhar } from './dto/ProdutoParaDetalhar';
import { ProdutosPaginados } from './dto/ProdutosPaginados';
import { ProdutoParaListar } from './dto/ProdutosParaListar';
import { VisaoProdutos } from './interface/VisaoProdutos';

export class VisaoProdutosEmHtml implements VisaoProdutos {
  private itensPorPagina: number;

  public constructor(private controladoraProdutos: ControladoraProdutos) {
    this.itensPorPagina = 6;
  }

  iniciar(): void {
    this.controladoraProdutos.listar(1, this.itensPorPagina);
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

  detalhar(produto: ProdutoParaDetalhar): void {
    const ancoraCarrinho = document.getElementById(
      'carrinho',
    ) as HTMLAnchorElement;

    ancoraCarrinho.classList.remove('invisible');

    const id = document.getElementById('produto-id') as HTMLInputElement;
    const foto = document.getElementById('foto') as HTMLImageElement;
    const nome = document.getElementById('nome') as HTMLHeadingElement;
    const lancamento = document.getElementById(
      'lancamento',
    ) as HTMLHeadingElement;
    const descricao = document.getElementById(
      'descricao',
    ) as HTMLParagraphElement;
    const precoSemDesconto = document.getElementById(
      'preco-sem-desconto',
    ) as HTMLSpanElement;
    const preco = document.getElementById('preco') as HTMLSpanElement;
    const quantidade = document.getElementById(
      'quantidade',
    ) as HTMLInputElement;
    const botaoAdicionar = document.getElementById(
      'adicionar',
    ) as HTMLButtonElement;
    const botaoEsgotado = document.getElementById(
      'esgotado',
    ) as HTMLButtonElement;
    const botaoIrParaCarrinho = document.getElementById(
      'ir-para-carrinho',
    ) as HTMLButtonElement;

    id.value = produto.id;
    foto.src = produto.foto;
    nome.textContent = produto.nome;
    lancamento.textContent = produto.lancamento;
    descricao.textContent = produto.descricao;

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

    quantidade.value = '1';

    if (produto.estoque > 0) {
      quantidade.min = '1';
      quantidade.max =
        produto.estoque >= 10 ? '10' : produto.estoque.toString();

      botaoAdicionar.addEventListener('click', (event) => {
        event.preventDefault();

        this.controladoraProdutos.adicionarAoCarrinho(
          produto.id,
          quantidade.value,
        );

        this.incrementarValorBadgeCarrinho();
      });
    } else {
      quantidade.setAttribute('disabled', 'true');

      botaoAdicionar.classList.add('d-none');

      botaoEsgotado.classList.remove('d-none');
    }

    botaoIrParaCarrinho.addEventListener('click', (event) => {
      event.preventDefault();

      location.href = '/carrinho';
    });
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

        location.href = href;
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
      pageLink.href = `?pagina=${i}&limit=${this.itensPorPagina}`;

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

      pageLinkAnt.href = `?pagina=${paginaAtual - 1}&limit=${this.itensPorPagina}`;
    } else {
      pageItemAnt.classList.add('disabled');
    }

    const pageItemProx = document.getElementById('proximo') as HTMLLIElement;

    if (temProx) {
      pageItemProx.classList.remove('disabled');

      const pageLinkProx = pageItemProx?.querySelector(
        'a',
      ) as HTMLAnchorElement;

      pageLinkProx.href = `?pagina=${paginaAtual + 1}&limit=${this.itensPorPagina}`;
    } else {
      pageItemProx.classList.add('disabled');
    }
  }

  private incrementarValorBadgeCarrinho(): void {
    const badge = document.getElementById('badge') as HTMLSpanElement;

    const valor = parseInt(badge.textContent);
    const novoValor = valor + 1;

    badge.textContent = novoValor.toString();

    if (novoValor === 1) {
      badge.classList.remove('invisible');
    }
  }
}
