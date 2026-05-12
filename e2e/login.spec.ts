import test from 'playwright/test';
import { PaginaLogin } from './pom/PaginaLogin';

test.describe('Login', () => {
  let pagina: PaginaLogin | null;

  test.beforeEach(async ({ page }) => {
    pagina = new PaginaLogin(page);

    await pagina.abrir();
  });

  test.afterEach(() => {
    pagina = null;
  });

  test('deveria realizar o login', async () => {
    const json = { nome: 'abc', papel: 'abc' };

    await pagina?.mockarRotaLogin(json);
    await pagina?.mockarRotaUsuarioLogado(json);

    await pagina?.preencherIdentificador('abc');
    await pagina?.preencherSenha('abc');

    await pagina?.clicarEmEntrar();

    pagina?.afirmarRedirecionamento();
    await pagina?.afirmarUsuarioLogado(json.nome);
  });

  test.describe('Funcionário', () => {
    test.beforeEach(async () => {
      const json = { nome: 'abc', papel: 'funcionario' };

      await pagina?.mockarRotaUsuarioLogado(json);
    });

    test('deveria exibir a opção para acessar as compras', async () => {
      await pagina?.abrirPaginaInicial();
      await pagina?.abrirMenuUsuario();

      await pagina?.afirmarOpcaoCompras();
    });

    test('deveria exibir a opção para acessar os relatórios', async () => {
      await pagina?.abrirPaginaInicial();
      await pagina?.abrirMenuUsuario();

      await pagina?.afirmarOpcaoRelatorios();
    });

    test('deveria exibir a opção de logout', async () => {
      await pagina?.abrirPaginaInicial();
      await pagina?.abrirMenuUsuario();

      await pagina?.afirmarOpcaoLogout();
    });
  });

  test.describe('Aluno', () => {
    test.beforeEach(async () => {
      const json = { nome: 'abc', papel: 'aluno' };

      await pagina?.mockarRotaUsuarioLogado(json);
    });

    test('deveria exibir a opção para acessar as compras', async () => {
      await pagina?.abrirPaginaInicial();
      await pagina?.abrirMenuUsuario();

      await pagina?.afirmarOpcaoCompras();
    });

    test('deveria não exibir a opção para acessar os relatórios', async () => {
      await pagina?.abrirPaginaInicial();
      await pagina?.abrirMenuUsuario();

      await pagina?.afirmarOpcaoRelatoriosInvisivel();
    });

    test('deveria exibir a opção de logout', async () => {
      await pagina?.abrirPaginaInicial();
      await pagina?.abrirMenuUsuario();

      await pagina?.afirmarOpcaoLogout();
    });
  });

  test('deveria realizar o logout', async () => {
    const json = { nome: 'abc', papel: 'abc' };

    await pagina?.mockarRotaUsuarioLogado(json);
    await pagina?.mockarRotaLogout();

    await pagina?.abrirPaginaInicial();
    await pagina?.abrirMenuUsuario();

    await pagina?.clicarEmLogout();

    await pagina?.mockarRotaUsuarioLogado({}, 404);

    await pagina?.afirmarBotaoLogin();
  });
});
