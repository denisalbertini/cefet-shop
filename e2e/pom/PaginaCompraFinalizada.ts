import { expect, Page } from 'playwright/test';
import { ItemParaListar } from '../../src/carrinhos/itens/dto/ItemParaListar';
import { APP } from '../../src/util/constantes';

export class PaginaCompraFinalizada {
  constructor(private page: Page) {}

  async abrir(): Promise<void> {
    await this.page.goto(APP.HOST + '/compra/abc');
  }

  async afirmarNumeroCompra(numero: string): Promise<void> {
    const localizador = this.page.getByText(numero);

    await expect(localizador).toBeVisible();
  }

  async afirmarDataHora(data: string): Promise<void> {
    const localizador = this.page.getByText(data);

    await expect(localizador).toBeVisible();
  }

  async afirmarNomeUsuario(nome: string): Promise<void> {
    const localizador = this.page.getByText(nome);

    await expect(localizador).toBeVisible();
  }

  async afirmarItens(itens: ItemParaListar[]): Promise<void> {
    const lista = this.page.locator('#itens');

    await expect(lista).toHaveCount(itens.length);
  }

  async afirmarItem(item: ItemParaListar): Promise<void> {
    const quantidade = this.page.getByText(`x${item.quantidade.toString()}`);
    const subtotal = this.page.getByText(item.subTotal);
    const produtoFoto = this.page.getByText(item.produtoFoto);
    const produtoNome = this.page.getByText(item.produtoNome);

    await expect(quantidade).toBeVisible();
    await expect(subtotal).toBeVisible();
    await expect(produtoFoto).toBeVisible();
    await expect(produtoNome).toBeVisible();
  }

  async afirmarBotaoImprimir(): Promise<void> {
    const localizador = this.page.locator('#imprimir');

    await expect(localizador).toBeVisible();
  }

  async afirmarMensagemResgate(): Promise<void> {
    const localizador = this.page.getByText('9h às 18h');

    await expect(localizador).toBeVisible();
  }
}
