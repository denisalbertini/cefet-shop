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
        async (route) => await route.fulfill({ status: 201 }),
      );

      await pagina!.abrirProdutoComEstoqueMaiorQueDez();
    });

    test('deveria exibir os elementos corretamente', async () => {
      const id = await pagina!.obterValorInput(pagina!.localizarId());
      const foto = pagina!.localizarFoto();
      const nome = await pagina!.obterConteudoTextual(pagina!.localizarNome());
      const lancamento = await pagina!.obterConteudoTextual(
        pagina!.localizarLancamento(),
      );
      const descricao = await pagina!.obterConteudoTextual(
        pagina!.localizarDescricao(),
      );
      const precoSemDesconto = pagina!.localizarPrecoSemDesconto();
      const valorPrecoSemDesconto =
        await pagina!.obterConteudoTextual(precoSemDesconto);
      const preco = await pagina!.obterConteudoTextual(
        pagina!.localizarPreco(),
      );
      const quantidade = pagina!.localizarQuantidade();
      const adicionarAoCarrinho = pagina!.localizarAdicionarAoCarrinho();
      const esgotado = pagina!.localizarEsgotado();
      const irParaCarrinho = pagina!.localizarIrParaCarrinho();

      expect(id).toBe(produto.id);
      await expect(foto).toHaveAttribute('src', produto.foto);
      expect(nome).toBe(produto.nome);
      expect(lancamento).toBe(produto.lancamento);
      expect(descricao).toBe(produto.descricao);
      await expect(precoSemDesconto).toHaveClass(
        'text-decoration-line-through',
      );
      expect(valorPrecoSemDesconto).toBe(produto.preco);
      expect(preco).toBe(produto.precoPromocional);
      await expect(quantidade).toHaveAttribute('min', '1');
      await expect(quantidade).toHaveAttribute('max', '10');
      await expect(adicionarAoCarrinho).toBeVisible();
      await expect(esgotado).not.toBeVisible();
      await expect(irParaCarrinho).toBeVisible();
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
        async (route) => await route.fulfill({ status: 201 }),
      );

      await pagina!.abrirProdutoComEstoqueMenorQueDez();
    });

    test('deveria exibir os elementos corretamente', async () => {
      const id = await pagina!.obterValorInput(pagina!.localizarId());
      const foto = pagina!.localizarFoto();
      const nome = await pagina!.obterConteudoTextual(pagina!.localizarNome());
      const lancamento = await pagina!.obterConteudoTextual(
        pagina!.localizarLancamento(),
      );
      const descricao = await pagina!.obterConteudoTextual(
        pagina!.localizarDescricao(),
      );
      const precoSemDesconto = pagina!.localizarPrecoSemDesconto();
      const valorPrecoSemDesconto =
        await pagina!.obterConteudoTextual(precoSemDesconto);
      const preco = await pagina!.obterConteudoTextual(
        pagina!.localizarPreco(),
      );
      const quantidade = pagina!.localizarQuantidade();
      const adicionarAoCarrinho = pagina!.localizarAdicionarAoCarrinho();
      const esgotado = pagina!.localizarEsgotado();
      const irParaCarrinho = pagina!.localizarIrParaCarrinho();

      expect(id).toBe(produto.id);
      await expect(foto).toHaveAttribute('src', produto.foto);
      expect(nome).toBe(produto.nome);
      expect(lancamento).toBe(produto.lancamento);
      expect(descricao).toBe(produto.descricao);
      await expect(precoSemDesconto).not.toBeVisible();
      expect(valorPrecoSemDesconto).toBe('');
      expect(preco).toBe(produto.preco);
      await expect(quantidade).toHaveAttribute('min', '1');
      await expect(quantidade).toHaveAttribute('max', '9');
      await expect(adicionarAoCarrinho).toBeVisible();
      await expect(esgotado).not.toBeVisible();
      await expect(irParaCarrinho).toBeVisible();
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
      const id = await pagina!.obterValorInput(pagina!.localizarId());
      const foto = pagina!.localizarFoto();
      const nome = await pagina!.obterConteudoTextual(pagina!.localizarNome());
      const lancamento = await pagina!.obterConteudoTextual(
        pagina!.localizarLancamento(),
      );
      const descricao = await pagina!.obterConteudoTextual(
        pagina!.localizarDescricao(),
      );
      const precoSemDesconto = pagina!.localizarPrecoSemDesconto();
      const valorPrecoSemDesconto =
        await pagina!.obterConteudoTextual(precoSemDesconto);
      const preco = await pagina!.obterConteudoTextual(
        pagina!.localizarPreco(),
      );
      const quantidade = pagina!.localizarQuantidade();
      const adicionarAoCarrinho = pagina!.localizarAdicionarAoCarrinho();
      const esgotado = pagina!.localizarEsgotado();
      const irParaCarrinho = pagina!.localizarIrParaCarrinho();

      expect(id).toBe(produto.id);
      await expect(foto).toHaveAttribute('src', produto.foto);
      expect(nome).toBe(produto.nome);
      expect(lancamento).toBe(produto.lancamento);
      expect(descricao).toBe(produto.descricao);
      await expect(precoSemDesconto).not.toBeVisible();
      expect(valorPrecoSemDesconto).toBe('');
      expect(preco).toBe(produto.preco);
      expect(await pagina!.obterAtributo(quantidade, 'min')).toBeNull();
      expect(await pagina!.obterAtributo(quantidade, 'max')).toBeNull();
      await expect(adicionarAoCarrinho).not.toBeVisible();
      await expect(esgotado).toBeVisible();
      await expect(irParaCarrinho).toBeVisible();
    });

    test('deveria ir para o carrinho', async ({ page }) => {
      const irParaCarrinho = pagina!.localizarIrParaCarrinho();

      await pagina!.pressionar(irParaCarrinho);

      await expect(page).toHaveURL('http://localhost:5173/carrinho');
    });
  });
});
