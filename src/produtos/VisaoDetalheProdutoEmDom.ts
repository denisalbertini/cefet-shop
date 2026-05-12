import { navegarPara } from '../util/navegarPara';
import { ControladoraProdutos } from './ControladoraProdutos';
import { ProdutoParaDetalhar } from './dto/ProdutoParaDetalhar';
import { VisaoDetalheProduto } from './interface/VisaoDetalheProduto';

export class VisaoDetalheProdutoEmDom implements VisaoDetalheProduto {
  private controladoraProdutos?: ControladoraProdutos;

  definirControladora(controladoraProdutos: ControladoraProdutos): void {
    this.controladoraProdutos = controladoraProdutos;
  }

  iniciar(id: string): void {
    this.controladoraProdutos?.detalhar(id);
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

        this.controladoraProdutos?.adicionarAoCarrinho(
          produto.id,
          quantidade.value,
        );
      });
    } else {
      quantidade.setAttribute('disabled', 'true');

      botaoAdicionar.classList.add('d-none');

      botaoEsgotado.classList.remove('d-none');
    }

    botaoIrParaCarrinho.addEventListener('click', (event) => {
      event.preventDefault();

      navegarPara('/carrinho');
    });
  }

  exibirErro(): void {
    const card = document.querySelector('.card');

    card?.classList.add('d-none');

    const alert = document.querySelector('.alert');

    alert?.classList.remove('d-none');
  }
}
