import test from 'playwright/test';
import { ItemCompraParaListar } from '../src/compras/itens-compra/dto/ItemCompraParaListar';
import { API } from '../src/util/constantes';
import { PaginaCompraFinalizada } from './pom/PaginaCompraFinalizada';

test.describe('Compra Finalizada', () => {
  const numeroCompra = 'abc';
  const nomeCompletoUsuario = 'aluno do cefet';
  const data = '15/05/2026';
  const total = '100,00';
  const itens = [
    new ItemCompraParaListar(2, '100,00', 'produtoId', 'produtoNome'),
  ];

  let pagina: PaginaCompraFinalizada | null;

  test.beforeEach(async ({ page }) => {
    await page.route(
      API.HOST + '/compras/*',
      async (route) =>
        await route.fulfill({
          json: { numeroCompra, nomeCompletoUsuario, data, total, itens },
        }),
    );

    pagina = new PaginaCompraFinalizada(page);

    await pagina.abrir();
  });

  test.afterEach(() => {
    pagina = null;
  });

  test('deveria exibir o número da compra', async () => {
    await pagina!.afirmarNumeroCompra(numeroCompra);
  });

  test('deveria exibir a data e hora da compra', async () => {
    await pagina!.afirmarDataHora(data);
  });

  test('deveria exibir o nome do usuário da compra', async () => {
    await pagina!.afirmarNomeUsuario(nomeCompletoUsuario);
  });

  test('deveria exibir os itens da compra', async () => {
    await pagina!.afirmarItens(itens);
  });

  test('deveria exibir o botão de imprimir', async () => {
    await pagina!.afirmarBotaoImprimir();
  });

  test('deveria exibir a mensagem de resgate', async () => {
    await pagina!.afirmarMensagemResgate();
  });
});
