import { GestorCarrinhos } from './GestorCarrinhos';
import { VisaoCarrinhos } from './VisaoCarrinhos';
import { VisaoCarrinhosEmHtml } from './VisaoCarrinhosEmHtml';

export class ControladoraCarrinhos {
    public readonly visaoCarrinhos: VisaoCarrinhos;

    public constructor(private gestorCarrinhos: GestorCarrinhos) {
        this.visaoCarrinhos = new VisaoCarrinhosEmHtml(this);
    }

    public async exibir(): Promise<void> {
        const carrinho = await this.gestorCarrinhos.buscar();

        this.visaoCarrinhos.exibir(carrinho);
    }

    public async alterarQuantidadeItem(produtoId: string, quantidade: number): Promise<void> {
        const carrinho = await this.gestorCarrinhos.alterarQuantidadeItem(produtoId, quantidade);

        this.visaoCarrinhos.alterarQuantidadeItem(carrinho);
    }

    public async removerItem(produtoId: string): Promise<void> {
        const carrinho = await this.gestorCarrinhos.removerItem(produtoId);

        this.visaoCarrinhos.removerItem(carrinho);
    }
}
