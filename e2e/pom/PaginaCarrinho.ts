import { Locator, Page } from 'playwright/test';

export class PaginaCarrinho {
    public constructor(private page: Page) {}

    public async abrir(): Promise<void> {
        await this.page.goto('http://localhost:5173/carrinho');
    }

    public localizarItens(): Locator {
        return this.page.locator('.list-group-item');
    }

    public localizarProdutoIds(): Locator {
        return this.page.locator('.produtoId');
    }

    public localizarProdutoFotos(): Locator {
        return this.page.locator('.produtoFoto');
    }

    public localizarProdutoNomes(): Locator {
        return this.page.locator('.produtoNome');
    }

    public localizarQuantidades(): Locator {
        return this.page.locator('.quantidade');
    }

    public localizarSubTotais(): Locator {
        return this.page.locator('.subTotal');
    }

    public localizarTotal(): Locator {
        return this.page.locator('#total');
    }

    public localizarBotoesRemover(): Locator {
        return this.page.locator('.remover');
    }

    public localizarPrimeiro(localizador: Locator): Locator {
        return localizador.first();
    }

    public localizarTexto(texto: string): Locator {
        return this.page.locator(texto);
    }

    public contar(localizador: Locator): Promise<number> {
        return localizador.count();
    }

    public obterConteudoTextual(localizador: Locator): Promise<string | null> {
        return localizador.textContent();
    }

    public obterValorInput(localizador: Locator): Promise<string> {
        return localizador.inputValue();
    }

    public async preencher(localizador: Locator, valor: string): Promise<void> {
        await localizador.fill(valor);
    }

    public async pressionarEnter(localizador: Locator): Promise<void> {
        await localizador.press('Enter');
    }

    public async clicar(localizador: Locator): Promise<void> {
        await localizador.click();
    }
}
