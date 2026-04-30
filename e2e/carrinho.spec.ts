import { expect, test } from 'playwright/test';
import { CarrinhoAtualizado } from '../src/carrinhos/CarrinhoAtualizado';
import { CarrinhoParaExibir } from '../src/carrinhos/CarrinhoParaExibir';
import { ItemParaListar } from '../src/carrinhos/ItemParaListar';
import { API } from '../src/constantes';
import { PaginaCarrinho } from './pom/PaginaCarrinho';

test.describe('Carrinho', () => {
    let pagina: PaginaCarrinho | null;

    test.beforeEach(async ({ page }) => {
        await page.route(API.HOST + 'carrinhos/', async (route) => {
            const json = new CarrinhoParaExibir('20,00', [
                new ItemParaListar(
                    1,
                    '10,00',
                    'abc',
                    'http://placehold.co/400x500',
                    'produto 1',
                    15
                ),
                new ItemParaListar(
                    1,
                    '10,00',
                    'def',
                    'http://placehold.co/400x500',
                    'produto 2',
                    5
                ),
            ]);

            await route.fulfill({ json });
        });

        await page.route(API.HOST + 'carrinhos/itens/*', async (route) => {
            const json = new CarrinhoAtualizado('abc', '100', '110');

            await route.fulfill({ json });
        });

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

    test('deveria exibir os atributos de um item corretamente', async () => {
        const quantidade = await pagina!.obterValorInput(
            pagina!.localizarPrimeiro(pagina!.localizarQuantidades())
        );
        const subTotal = await pagina!.obterConteudoTextual(
            pagina!.localizarPrimeiro(pagina!.localizarSubTotais())
        );
        const produtoId = await pagina!.obterValorInput(
            pagina!.localizarPrimeiro(pagina!.localizarProdutoIds())
        );
        const produtoNome = await pagina!.obterConteudoTextual(
            pagina!.localizarPrimeiro(pagina!.localizarProdutoNomes())
        );
        const imgProdutoFoto = pagina!.localizarPrimeiro(pagina!.localizarProdutoFotos());

        expect(quantidade).toBe('1');
        expect(subTotal).toBe('10,00');
        expect(produtoId).toBe('abc');
        expect(produtoNome).toBe('produto 1');
        await expect(imgProdutoFoto).toHaveAttribute('src', 'http://placehold.co/400x500');
    });

    test('deveria limitar a quantidade de um item com estoque maior que 10', async () => {
        const inputQuantidade = pagina!.localizarPrimeiro(pagina!.localizarQuantidades());

        await expect(inputQuantidade).toHaveAttribute('min', '1');
        await expect(inputQuantidade).toHaveAttribute('max', '10');
    });

    test('deveria limitar a quantidade de um item com estoque menor que 10', async () => {
        const inputQuantidade = pagina!.localizarSegundo(pagina!.localizarQuantidades());

        await expect(inputQuantidade).toHaveAttribute('min', '1');
        await expect(inputQuantidade).toHaveAttribute('max', '5');
    });

    test('deveria alterar a quantidade de um item', async () => {
        const inputQuantidade = pagina!.localizarPrimeiro(pagina!.localizarQuantidades());

        const spanSubTotal = pagina!.localizarPrimeiro(pagina!.localizarSubTotais());
        const subTotal = await pagina!.obterConteudoTextual(spanSubTotal);

        const spanTotal = pagina!.localizarTotal();
        const total = await pagina!.obterConteudoTextual(spanTotal);

        await pagina!.preencher(inputQuantidade, '10');
        await pagina!.pressionarEnter(inputQuantidade);

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
