import { Locator, Page } from 'playwright/test';

export class PaginaProduto {
  public constructor(private page: Page) {}

  public async abrirProdutoComEstoqueMaiorQueDez(): Promise<void> {
    await this.page.goto('http://localhost:5173/produto/abc');
  }

  public async abrirProdutoComEstoqueMenorQueDez(): Promise<void> {
    await this.page.goto('http://localhost:5173/produto/def');
  }

  public async abrirProdutoEsgotado(): Promise<void> {
    await this.page.goto('http://localhost:5173/produto/ghi');
  }

  public localizarId(): Locator {
    return this.page.locator('#produto-id');
  }

  public localizarFoto(): Locator {
    return this.page.locator('#foto');
  }

  public localizarNome(): Locator {
    return this.page.locator('#nome');
  }

  public localizarLancamento(): Locator {
    return this.page.locator('#lancamento');
  }

  public localizarDescricao(): Locator {
    return this.page.locator('#descricao');
  }

  public localizarPrecoSemDesconto(): Locator {
    return this.page.locator('#preco-sem-desconto');
  }

  public localizarPreco(): Locator {
    return this.page.locator('#preco');
  }

  public localizarQuantidade(): Locator {
    return this.page.locator('#quantidade');
  }

  public localizarAdicionarAoCarrinho(): Locator {
    return this.page.locator('#adicionar');
  }

  public localizarEsgotado(): Locator {
    return this.page.locator('#esgotado');
  }

  public localizarIrParaCarrinho(): Locator {
    return this.page.locator('#ir-para-carrinho');
  }

  public localizarBadge(): Locator {
    return this.page.locator('#badge');
  }

  public async obterConteudoTextual(
    localizador: Locator,
  ): Promise<string | null> {
    return await localizador.textContent();
  }

  public async obterValorInput(localizador: Locator): Promise<string> {
    return await localizador.inputValue();
  }

  public async obterAtributo(
    localizador: Locator,
    atributo: string,
  ): Promise<string | null> {
    return localizador.getAttribute(atributo);
  }

  public async pressionar(localizador: Locator): Promise<void> {
    await localizador.click();
  }
}
