import { expect, test } from 'playwright/test';
import { CarrinhoAtualizado } from '../src/carrinhos/dto/CarrinhoAtualizado';
import { CarrinhoParaExibir } from '../src/carrinhos/dto/CarrinhoParaExibir';
import { ItemParaListar } from '../src/carrinhos/itens/dto/ItemParaListar';
import { API } from '../src/util/constantes';
import { PaginaCarrinho } from './pom/PaginaCarrinho';

test.describe('Carrinho', () => {
  let pagina: PaginaCarrinho | null;

  test.beforeEach(async ({ page }) => {
    await page.route(API.HOST + '/carrinhos', async (route) => {
      const json = new CarrinhoParaExibir('20,00', [
        new ItemParaListar(
          1,
          '10,00',
          'abc',
          'http://placehold.co/400x500',
          'produto 1',
          15,
        ),
        new ItemParaListar(
          1,
          '10,00',
          'def',
          'http://placehold.co/400x500',
          'produto 2',
          5,
        ),
      ]);

      await route.fulfill({ json });
    });

    await page.route(API.HOST + '/carrinhos/itens/*', async (route) => {
      const json = new CarrinhoAtualizado('abc', '100', '110');

      await route.fulfill({ json });
    });

    pagina = new PaginaCarrinho(page);

    await pagina.abrir();
  });

  test.afterEach(() => {
    pagina = null;
  });

  test('deveria exibir os itens do carrinho', async ({ page }) => {
    await expect(pagina!.localizarItens()).toHaveCount(2);
    await expect(pagina!.localizarProdutoIds()).toHaveCount(2);
    await expect(pagina!.localizarProdutoFotos()).toHaveCount(2);
    await expect(pagina!.localizarProdutoNomes()).toHaveCount(2);
    await expect(pagina!.localizarQuantidades()).toHaveCount(2);
    await expect(pagina!.localizarSubTotais()).toHaveCount(2);
    await expect(pagina!.localizarTotal()).not.toHaveText('');
  });

  test('deveria exibir os atributos de um item corretamente', async () => {
    const quantidade = await pagina!.obterValorInput(
      pagina!.localizarPrimeiro(pagina!.localizarQuantidades()),
    );
    const subTotal = await pagina!.obterConteudoTextual(
      pagina!.localizarPrimeiro(pagina!.localizarSubTotais()),
    );
    const produtoId = await pagina!.obterValorInput(
      pagina!.localizarPrimeiro(pagina!.localizarProdutoIds()),
    );
    const produtoNome = await pagina!.obterConteudoTextual(
      pagina!.localizarPrimeiro(pagina!.localizarProdutoNomes()),
    );
    const imgProdutoFoto = pagina!.localizarPrimeiro(
      pagina!.localizarProdutoFotos(),
    );

    expect(quantidade).toBe('1');
    expect(subTotal).toBe('10,00');
    expect(produtoId).toBe('abc');
    expect(produtoNome).toBe('produto 1');
    await expect(imgProdutoFoto).toHaveAttribute(
      'src',
      'http://placehold.co/400x500',
    );
  });

  test('deveria limitar a quantidade de um item com estoque maior que 10', async () => {
    const inputQuantidade = pagina!.localizarPrimeiro(
      pagina!.localizarQuantidades(),
    );

    await expect(inputQuantidade).toHaveAttribute('min', '1');
    await expect(inputQuantidade).toHaveAttribute('max', '10');
  });

  test('deveria limitar a quantidade de um item com estoque menor que 10', async () => {
    const inputQuantidade = pagina!.localizarSegundo(
      pagina!.localizarQuantidades(),
    );

    await expect(inputQuantidade).toHaveAttribute('min', '1');
    await expect(inputQuantidade).toHaveAttribute('max', '5');
  });

  test('deveria alterar a quantidade de um item', async () => {
    const inputQuantidade = pagina!.localizarPrimeiro(
      pagina!.localizarQuantidades(),
    );

    const spanSubTotal = pagina!.localizarPrimeiro(
      pagina!.localizarSubTotais(),
    );
    const subTotal = await pagina!.obterConteudoTextual(spanSubTotal);

    const spanTotal = pagina!.localizarTotal();
    const total = await pagina!.obterConteudoTextual(spanTotal);

    await pagina!.preencher(inputQuantidade, '10');
    await pagina!.pressionarEnter(inputQuantidade);

    await expect(spanSubTotal).not.toHaveText(subTotal!);
    await expect(spanTotal).not.toHaveText(total!);
  });

  test('deveria remover um item', async () => {
    await expect(pagina!.localizarItens()).toHaveCount(2);

    const botaoRemover = pagina!.localizarPrimeiro(
      pagina!.localizarBotoesRemover(),
    );

    await pagina!.clicar(botaoRemover);

    await expect(pagina!.localizarItens()).toHaveCount(1);
  });

  test('deveria exibir um alerta ao tentar finalizar a compra caso o servidor retorne um erro', async ({
    page,
  }) => {
    const erro = 'item alterado';

    await page.route(
      API.HOST + '/compras',
      async (route) =>
        await route.fulfill({ status: 400, json: { erros: [erro] } }),
    );

    const botaoFinalizar = pagina!.localizarBotaoFinalizar();

    await pagina!.clicar(botaoFinalizar);

    const contagemAlertas = await pagina!.contar(pagina!.localizarAlertas());
    const mensagemAlerta = pagina!.localizarTexto(erro);

    expect(contagemAlertas).toBe(1);
    await expect(mensagemAlerta).toBeVisible();
  });

  test('deveria redirecionar para a página de login ao tentar finalizar a compra sem estar logado', async ({
    page,
  }) => {
    await page.route(
      API.HOST + '/compras',
      async (route) =>
        await route.fulfill({ status: 401, json: { erros: [] } }),
    );

    const botaoFinalizar = pagina!.localizarBotaoFinalizar();

    await pagina!.clicar(botaoFinalizar);

    await pagina!.afirmarUrlLogin();
  });

  test('deveria redirecionar para a página de compra finalizada quando a compra é finalizada com sucesso', async ({
    page,
  }) => {
    await page.route(
      API.HOST + '/compras',
      async (route) => await route.fulfill({ json: { id: 'abc' } }),
    );

    const botaoFinalizar = pagina!.localizarBotaoFinalizar();

    await pagina!.clicar(botaoFinalizar);

    await pagina!.afirmarUrlCompraFinalizada();
  });
});
