import { CarrinhoParaExibir } from './CarrinhoParaExibir';
import { ControladoraCarrinhos } from './ControladoraCarrinhos';
import { ItemParaListar } from './ItemParaListar';
import { VisaoCarrinhos } from './VisaoCarrinhos';

export class VisaoCarrinhosEmHtml implements VisaoCarrinhos {
    public constructor(private controladoraCarrinhos: ControladoraCarrinhos) {}

    async iniciar(): Promise<void> {
        await this.controladoraCarrinhos.exibir();

        const quantidadeInputs = document.getElementsByClassName('quantidade');

        for (const input of quantidadeInputs) {
            (input as HTMLInputElement).addEventListener('change', (event) => {
                this.prepararParaAlterarQuantidadeItem(event);
            });
        }

        const removerButtons = document.getElementsByClassName('remover');

        for (const button of removerButtons) {
            (button as HTMLButtonElement).addEventListener('click', (event) => {
                this.prepararParaRemoverItem(event);
            });
        }
    }

    exibir(carrinho: CarrinhoParaExibir): void {
        const fragment = document.createDocumentFragment();

        for (const item of carrinho.itens) {
            fragment.appendChild(this.criarItemLista(item));
        }

        document.getElementById('lista')?.replaceChildren(fragment);

        this.escreverTotal(carrinho.total);
    }

    alterarQuantidadeItem(carrinho: CarrinhoParaExibir): void {
        const item = carrinho.itens[0];

        const li = this.buscarItemLista(item.produtoId);

        (li?.querySelector('.subTotal') as HTMLSpanElement).textContent = item.subTotal;

        this.escreverTotal(carrinho.total);
    }

    removerItem(carrinho: CarrinhoParaExibir): void {
        const item = carrinho.itens[0];

        console.log(item.produtoId);

        const li = this.buscarItemLista(item.produtoId);

        li?.remove();

        this.escreverTotal(carrinho.total);
    }

    private prepararParaAlterarQuantidadeItem(event: Event): void {
        const target = event.target as HTMLElement;

        const produtoId = this.obterProdutoId(target);
        const quantidade = parseInt((target as HTMLInputElement).value);

        this.controladoraCarrinhos.alterarQuantidadeItem(produtoId, quantidade);
    }

    private prepararParaRemoverItem(event: Event): void {
        event.preventDefault();

        const target = event.target as HTMLElement;

        const produtoId = this.obterProdutoId(target);

        console.log(produtoId);

        this.controladoraCarrinhos.removerItem(produtoId);
    }

    private obterProdutoId(target: HTMLElement): string {
        let li = target.parentElement!;

        for (let i = 0; i < 4; i++) {
            li = li.parentElement!;
        }

        return (li?.firstElementChild! as HTMLInputElement).value;
    }

    private criarItemLista(item: ItemParaListar): HTMLElement {
        const template = document.getElementById('item') as HTMLTemplateElement;

        const li = template.content.cloneNode(true) as HTMLElement;

        (li.querySelector('.produtoId') as HTMLInputElement).value = item.produtoId;
        (li.querySelector('.produtoFoto') as HTMLImageElement).src = item.produtoFoto;
        (li.querySelector('.produtoNome') as HTMLParagraphElement).textContent = item.produtoNome;
        (li.querySelector('.quantidade') as HTMLInputElement).value = item.quantidade.toString();
        (li.querySelector('.subTotal') as HTMLSpanElement).textContent = item.subTotal;

        return li;
    }

    private escreverTotal(total: string): void {
        (document.getElementById('total') as HTMLSpanElement).textContent = total;
    }

    private buscarItemLista(produtoId: string): HTMLElement | null {
        const idInputs = document.querySelectorAll('.produtoId');

        let li: HTMLElement | null = null;

        for (const input of idInputs) {
            if ((input as HTMLInputElement).value === produtoId) {
                li = input.parentElement as HTMLElement;

                break;
            }
        }

        return li;
    }
}
