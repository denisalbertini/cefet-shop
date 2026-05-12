import { expect, Page } from 'playwright/test';
import { API, APP } from '../../src/util/constantes';

export class PaginaLogin {
  constructor(private page: Page) {}

  async abrir(): Promise<void> {
    await this.page.goto(APP.HOST + '/login');
  }

  async abrirPaginaInicial(): Promise<void> {
    await this.page.goto(APP.HOST);
  }

  async mockarRotaLogin(json: object = {}): Promise<void> {
    await this.page.route(
      API.HOST + '/usuarios/login',
      async (route) => await route.fulfill({ json }),
    );
  }

  async mockarRotaUsuarioLogado(
    json: object = {},
    status?: number,
  ): Promise<void> {
    await this.page.route(
      API.HOST + '/usuarios',
      async (route) => await route.fulfill({ json, status }),
    );
  }

  async mockarRotaLogout(): Promise<void> {
    await this.page.route(
      API.HOST + '/usuarios/logout',
      async (route) => await route.fulfill(),
    );
  }

  async preencherIdentificador(identificador: string): Promise<void> {
    const input = this.page.locator('#identificador');

    await input.fill(identificador);
  }

  async preencherSenha(senha: string): Promise<void> {
    const input = this.page.locator('#senha');

    await input.fill(senha);
  }

  async clicarEmEntrar(): Promise<void> {
    const botao = this.page.locator('#entrar');

    await botao.click();

    await this.page.waitForURL(APP.HOST);
  }

  async clicarEmLogout(): Promise<void> {
    const botao = this.page.locator('#logout');

    await botao.click();

    await this.page.waitForURL(APP.HOST);
  }

  async abrirMenuUsuario(): Promise<void> {
    const menu = this.page.getByText('Olá');

    await menu.click();
  }

  afirmarRedirecionamento(): void {
    expect(this.page.url()).toBe(APP.HOST + '/');
  }

  async afirmarUsuarioLogado(nome: string): Promise<void> {
    const tituloMenuUsuario = this.page.getByText(`Olá ${nome}`);

    await expect(tituloMenuUsuario).toBeVisible();
  }

  async afirmarUsuarioNaoLogado(nome: string): Promise<void> {
    const botaoLogin = this.page.locator('#login');

    await expect(botaoLogin).toBeVisible();
  }

  async afirmarOpcaoCompras(): Promise<void> {
    const opcao = this.page.locator('#compras');

    await expect(opcao).toBeVisible();
  }

  async afirmarOpcaoRelatorios(): Promise<void> {
    const opcao = this.page.locator('#relatorios');

    await expect(opcao).toBeVisible();
  }

  async afirmarOpcaoRelatoriosInvisivel(): Promise<void> {
    const opcao = this.page.locator('#relatorios');

    await expect(opcao).not.toBeVisible();
  }

  async afirmarOpcaoLogout(): Promise<void> {
    const opcao = this.page.locator('#logout');

    await expect(opcao).toBeVisible();
  }

  async afirmarBotaoLogin(): Promise<void> {
    const botao = this.page.locator('#login');

    await expect(botao).toBeVisible();
  }
}
