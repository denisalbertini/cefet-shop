import { RepositorioError } from '../error/RepositorioError';
import { API, MENSAGEM_ERRO } from '../util/constantes';
import { CarrinhoAtualizado } from './dto/CarrinhoAtualizado';
import { CarrinhoParaExibir } from './dto/CarrinhoParaExibir';
import { RepositorioCarrinhos } from './interface/RepositorioCarrinhos';
import { ItemParaListar } from './itens/dto/ItemParaListar';
export class RepositorioCarrinhosEmHttp implements RepositorioCarrinhos {
    private path: string;
    private itensPath: string;

    public constructor() {
        this.path = API.HOST + '/carrinhos';
        this.itensPath = this.path + '/itens';
    }

    async buscar(): Promise<CarrinhoParaExibir> {
        const res = await fetch(this.path, { credentials: 'include' });

        this.verificarResposta(res);

        return await this.instanciarCarrinhoParaExibir(res);
    }

    async buscarQuantidadeItens(): Promise<number> {
        const res = await fetch(this.itensPath + '/quantidade', { credentials: 'include' });

        this.verificarResposta(res);

        const dados = await res.json();

        return dados.quantidade;
    }

    async adicionarItem(produtoId: string, quantidade: number): Promise<void> {
        const res = await fetch(this.itensPath, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ produtoId, quantidade }),
        });

        this.verificarResposta(res);
    }

    async alterarQuantidadeItem(
        produtoId: string,
        quantidade: number
    ): Promise<CarrinhoAtualizado> {
        const res = await fetch(this.itensPath + `/${produtoId}`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantidade }),
        });

        this.verificarResposta(res);

        return await this.instanciarCarrinhoAtualizado(res);
    }

    async removerItem(produtoId: string): Promise<CarrinhoAtualizado> {
        const res = await fetch(this.itensPath + `/${produtoId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        this.verificarResposta(res);

        return await this.instanciarCarrinhoAtualizado(res);
    }

    private verificarResposta(res: Response): void {
        if (res.ok) {
            return;
        }

        switch (res.status) {
            case 404:
                throw new RepositorioError(MENSAGEM_ERRO.REPOSITORIO.NOT_FOUND);
            default:
                throw new RepositorioError(MENSAGEM_ERRO.REPOSITORIO.INTERNAL_SERVER_ERROR);
        }
    }

    private async instanciarCarrinhoParaExibir(res: Response): Promise<CarrinhoParaExibir> {
        const dados = await res.json();

        const itensParaListar: ItemParaListar[] = [];

        for (const item of dados.itens) {
            itensParaListar.push(
                new ItemParaListar(
                    item.quantidade,
                    item.subTotal,
                    item.produtoId,
                    item.produtoFoto,
                    item.produtoNome,
                    item.produtoEstoque
                )
            );
        }

        return new CarrinhoParaExibir(dados.total, itensParaListar);
    }

    private async instanciarCarrinhoAtualizado(res: Response): Promise<CarrinhoAtualizado> {
        const dados = await res.json();

        return new CarrinhoAtualizado(dados.produtoId, dados.subTotal, dados.total);
    }
}
