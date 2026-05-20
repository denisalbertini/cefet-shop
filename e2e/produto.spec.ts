import test, { expect } from 'playwright/test';
import { ProdutoParaDetalhar } from '../src/produtos/dto/ProdutoParaDetalhar';
import { API } from '../src/util/constantes';
import { PaginaProduto } from './pom/PaginaProduto';

test.describe('Produto', () => {
  let pagina: PaginaProduto | null;

  test.beforeEach(({ page }) => {
    pagina = new PaginaProduto(page);
  });

  test.afterEach(() => {
    pagina = null;
  });

  test.describe('Produto com estoque > 10 e com promoção', () => {
    const produto = new ProdutoParaDetalhar(
      'id',
      'foto',
      'nome',
      'lancamento',
      'descricao',
      'preco',
      'preco promocional',
      11,
    );

    test.beforeEach(async ({ page }) => {
      await page.route(
        API.HOST + '/produtos/abc',
        async (route) => await route.fulfill({ json: produto }),
      );

      await page.route(
        API.HOST + '/carrinhos/itens',
        async (route) =>
          await route.fulfill({
            status: 201,
            json: { quantidadeItensCarrinho: 1 },
          }),
      );

      await pagina!.abrirProdutoComEstoqueMaiorQueDez();
    });

    test('deveria exibir os elementos corretamente', async () => {
      await expect(pagina!.localizarId()).toHaveAttribute('value', produto.id);
      await expect(pagina!.localizarFoto()).toHaveAttribute(
        'src',
        produto.foto,
      );
      await expect(pagina!.localizarNome()).toHaveText(produto.nome);
      await expect(pagina!.localizarLancamento()).toHaveText(
        produto.lancamento,
      );
      await expect(pagina!.localizarDescricao()).toHaveText(produto.descricao);
      await expect(pagina!.localizarPrecoSemDesconto()).toHaveClass(
        'text-decoration-line-through',
      );
      await expect(pagina!.localizarPrecoSemDesconto()).toHaveText(
        produto.preco,
      );
      await expect(pagina!.localizarPreco()).toHaveText(
        produto.precoPromocional!,
      );
      await expect(pagina!.localizarQuantidade()).toHaveAttribute('min', '1');
      await expect(pagina!.localizarQuantidade()).toHaveAttribute('max', '10');
      await expect(pagina!.localizarAdicionarAoCarrinho()).toBeVisible();
      await expect(pagina!.localizarEsgotado()).not.toBeVisible();
      await expect(pagina!.localizarIrParaCarrinho()).toBeVisible();
    });

    test('deveria adicionar ao carrinho', async () => {
      const adicionarAoCarrinho = pagina!.localizarAdicionarAoCarrinho();

      await pagina!.pressionar(adicionarAoCarrinho);

      const badge = pagina!.localizarBadge();
      const valorBadge = await pagina!.obterConteudoTextual(badge);

      await expect(badge).toBeVisible();
      expect(valorBadge).toBe('1');
    });

    test('deveria ir para o carrinho', async ({ page }) => {
      const irParaCarrinho = pagina!.localizarIrParaCarrinho();

      await pagina!.pressionar(irParaCarrinho);

      await expect(page).toHaveURL('http://localhost:5173/carrinho');
    });
  });

  test.describe('Produto com estoque < 10 e sem promoção', () => {
    const produto = new ProdutoParaDetalhar(
      'id',
      'foto',
      'nome',
      'lancamento',
      'descricao',
      'preco',
      null,
      9,
    );

    test.beforeEach(async ({ page }) => {
      await page.route(
        API.HOST + '/produtos/def',
        async (route) => await route.fulfill({ json: produto }),
      );

      await page.route(
        API.HOST + '/carrinhos/itens',
        async (route) =>
          await route.fulfill({
            status: 201,
            json: { quantidadeItensCarrinho: 1 },
          }),
      );

      await pagina!.abrirProdutoComEstoqueMenorQueDez();
    });

    test('deveria exibir os elementos corretamente', async () => {
      await expect(pagina!.localizarId()).toHaveAttribute('value', produto.id);
      await expect(pagina!.localizarFoto()).toHaveAttribute(
        'src',
        produto.foto,
      );
      await expect(pagina!.localizarNome()).toHaveText(produto.nome);
      await expect(pagina!.localizarLancamento()).toHaveText(
        produto.lancamento,
      );
      await expect(pagina!.localizarDescricao()).toHaveText(produto.descricao);
      await expect(pagina!.localizarPrecoSemDesconto()).not.toBeVisible();
      await expect(pagina!.localizarPrecoSemDesconto()).toHaveText('');
      await expect(pagina!.localizarPreco()).toHaveText(produto.preco);
      await expect(pagina!.localizarQuantidade()).toHaveAttribute('min', '1');
      await expect(pagina!.localizarQuantidade()).toHaveAttribute('max', '9');
      await expect(pagina!.localizarAdicionarAoCarrinho()).toBeVisible();
      await expect(pagina!.localizarEsgotado()).not.toBeVisible();
      await expect(pagina!.localizarIrParaCarrinho()).toBeVisible();
    });

    test('deveria adicionar ao carrinho', async () => {
      const adicionarAoCarrinho = pagina!.localizarAdicionarAoCarrinho();

      await pagina!.pressionar(adicionarAoCarrinho);

      const badge = pagina!.localizarBadge();
      const valorBadge = await pagina!.obterConteudoTextual(badge);

      await expect(badge).toBeVisible();
      expect(valorBadge).toBe('1');
    });

    test('deveria ir para o carrinho', async ({ page }) => {
      const irParaCarrinho = pagina!.localizarIrParaCarrinho();

      await pagina!.pressionar(irParaCarrinho);

      await expect(page).toHaveURL('http://localhost:5173/carrinho');
    });
  });

  test.describe('Produto esgotado', () => {
    const produto = new ProdutoParaDetalhar(
      'id',
      'foto',
      'nome',
      'lancamento',
      'descricao',
      'preco',
      null,
      0,
    );

    test.beforeEach(async ({ page }) => {
      await page.route(
        API.HOST + '/produtos/ghi',
        async (route) => await route.fulfill({ json: produto }),
      );

      await pagina!.abrirProdutoEsgotado();
    });

    test('deveria exibir os elementos corretamente', async () => {
      await expect(pagina!.localizarId()).toHaveAttribute('value', produto.id);
      await expect(pagina!.localizarFoto()).toHaveAttribute(
        'src',
        produto.foto,
      );
      await expect(pagina!.localizarNome()).toHaveText(produto.nome);
      await expect(pagina!.localizarLancamento()).toHaveText(
        produto.lancamento,
      );
      await expect(pagina!.localizarDescricao()).toHaveText(produto.descricao);
      await expect(pagina!.localizarPrecoSemDesconto()).not.toBeVisible();
      await expect(pagina!.localizarPrecoSemDesconto()).toHaveText('');
      await expect(pagina!.localizarPreco()).toHaveText(produto.preco);
      await expect(pagina!.localizarQuantidade()).toHaveAttribute(
        'disabled',
        'true',
      );
      await expect(pagina!.localizarAdicionarAoCarrinho()).not.toBeVisible();
      await expect(pagina!.localizarEsgotado()).toBeVisible();
      await expect(pagina!.localizarIrParaCarrinho()).toBeVisible();
    });

    test('deveria ir para o carrinho', async ({ page }) => {
      const irParaCarrinho = pagina!.localizarIrParaCarrinho();

      await pagina!.pressionar(irParaCarrinho);

      await expect(page).toHaveURL('http://localhost:5173/carrinho');
    });
  });
});
