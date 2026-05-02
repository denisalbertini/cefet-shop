import { VisaoError } from '../error/VisaoError';
import { GestorCarrinhos } from './GestorCarrinhos';
import { VisaoCarrinhos } from './interface/VisaoCarrinhos';
import { VisaoCarrinhosEmHtml } from './VisaoCarrinhosEmHtml';

export class ControladoraCarrinhos {
    public readonly visaoCarrinhos: VisaoCarrinhos;
    private visaoError: VisaoError;

    public constructor(private gestorCarrinhos: GestorCarrinhos) {
        this.visaoCarrinhos = new VisaoCarrinhosEmHtml(this);
        this.visaoError = new VisaoError();
    }

    public async exibir(): Promise<void> {
        try {
            const carrinho = await this.gestorCarrinhos.buscar();

            this.visaoCarrinhos.exibir(carrinho);
        } catch (erro: any) {
            this.tratarErro(erro);
        }
    }

    public async exibirQuantidadeItens(): Promise<void> {
        try {
            const quantidade = await this.gestorCarrinhos.buscarQuantidadeItens();

            this.visaoCarrinhos.exibirQuantidadeItens(quantidade);
        } catch (erro: any) {
            this.tratarErro(erro);
        }
    }

    public async alterarQuantidadeItem(produtoId: string, quantidade: number): Promise<void> {
        try {
            const carrinho = await this.gestorCarrinhos.alterarQuantidadeItem(
                produtoId,
                quantidade
            );

            this.visaoCarrinhos.alterarQuantidadeItem(carrinho);
        } catch (erro: any) {
            this.tratarErro(erro);
        }
    }

    public async removerItem(produtoId: string): Promise<void> {
        try {
            const carrinho = await this.gestorCarrinhos.removerItem(produtoId);

            this.visaoCarrinhos.removerItem(carrinho);
        } catch (erro: any) {
            this.tratarErro(erro);
        }
    }

    private tratarErro(erro: Error): void {
        this.visaoError.exibirErro(erro);
    }
}
