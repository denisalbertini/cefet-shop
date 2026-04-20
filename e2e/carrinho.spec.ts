import { expect, test } from 'playwright/test';
import { PaginaCarrinho } from './pom/PaginaCarrinho';

test.describe('Carrinho', () => {
    let pagina: PaginaCarrinho | null;

    test.beforeEach(async ({ page }) => {
        pagina = new PaginaCarrinho(page);

        await pagina.abrir();
    });

    test.afterEach(() => {
        pagina = null;
    });

    test('deveria exibir os itens do carrinho', async () => {
        const contagemItens = await pagina!.contar(pagina!.localizarItens());
        const contagemIds = await pagina!.contar(pagina!.localizarProdutoIds());
        const contagemFotos = await pagina!.contar(pagina!.localizarProdutoFotos());
        const contagemNomes = await pagina!.contar(pagina!.localizarProdutoNomes());
        const contagemQuantidades = await pagina!.contar(pagina!.localizarQuantidades());
        const contagemSubTotais = await pagina!.contar(pagina!.localizarSubTotais());
        const total = pagina!.obterConteudoTextual(pagina!.localizarTotal());

        expect(contagemItens).not.toBe(0);
        expect(contagemIds).toBe(contagemItens);
        expect(contagemFotos).toBe(contagemItens);
        expect(contagemNomes).toBe(contagemItens);
        expect(contagemQuantidades).toBe(contagemItens);
        expect(contagemSubTotais).toBe(contagemItens);
        expect(total).not.toBe('');
    });

    test('deveria alterar a quantidade de um item', async () => {
        const inputQuantidade = pagina!.localizarPrimeiro(pagina!.localizarQuantidades());
        const quantidade = await pagina!.obterValorInput(inputQuantidade);

        const spanSubTotal = pagina!.localizarPrimeiro(pagina!.localizarSubTotais());
        const subTotal = await pagina!.obterConteudoTextual(spanSubTotal);

        const spanTotal = pagina!.localizarTotal();
        const total = await pagina!.obterConteudoTextual(spanTotal);

        await pagina!.preencher(inputQuantidade, '10');
        await pagina!.pressionarEnter(inputQuantidade);

        await expect(inputQuantidade).not.toHaveValue(quantidade);
        await expect(spanSubTotal).not.toHaveText(subTotal!);
        await expect(spanTotal).not.toHaveText(total!);
    });

    test('deveria remover um item', async () => {
        const produtoId = await pagina!.obterValorInput(
            pagina!.localizarPrimeiro(pagina!.localizarProdutoIds())
        );

        const botaoRemover = pagina!.localizarPrimeiro(pagina!.localizarBotoesRemover());

        await pagina!.clicar(botaoRemover);

        const contagemId = await pagina!.contar(pagina!.localizarTexto(produtoId));

        expect(contagemId).toBe(0);
    });
});
