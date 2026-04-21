import { API, MENSAGEM_ERRO } from '../constantes';
import { RepositorioError } from '../error/RepositorioError';
import { CarrinhoParaExibir } from './CarrinhoParaExibir';
import { ItemParaListar } from './ItemParaListar';
import { RepositorioCarrinhos } from './RepositorioCarrinhos';

export class RepositorioCarrinhosEmHttp implements RepositorioCarrinhos {
    private path: string;
    private itensPath: string;

    public constructor() {
        this.path = API.HOST + 'carrinhos/';
        this.itensPath = this.path + 'itens/';
    }

    async buscar(): Promise<CarrinhoParaExibir> {
        const res = await fetch(this.path);

        this.verificarResposta(res);

        return await this.instanciarCarrinhoParaExibir(res);
    }

    async adicionarItem(produtoId: string, quantidade: number): Promise<CarrinhoParaExibir> {
        const res = await fetch(this.itensPath, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ produtoId, quantidade }),
        });

        this.verificarResposta(res);

        return await this.instanciarCarrinhoParaExibir(res);
    }

    async alterarQuantidadeItem(
        produtoId: string,
        quantidade: number
    ): Promise<CarrinhoParaExibir> {
        const res = await fetch(this.itensPath, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ produtoId, quantidade }),
        });

        this.verificarResposta(res);

        return await this.instanciarCarrinhoParaExibir(res);
    }

    async removerItem(produtoId: string): Promise<CarrinhoParaExibir> {
        const res = await fetch(this.itensPath, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ produtoId }),
        });

        this.verificarResposta(res);

        return await this.instanciarCarrinhoParaExibir(res);
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
}
