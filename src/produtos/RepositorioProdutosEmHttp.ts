import { RepositorioError } from '../error/RepositorioError';
import { Paginacao } from '../tipos/Paginacao';
import { API, MENSAGEM_ERRO } from '../util/constantes';
import { ProdutoParaDetalhar } from './dto/ProdutoParaDetalhar';
import { ProdutosPaginados } from './dto/ProdutosPaginados';
import { ProdutoParaListar } from './dto/ProdutosParaListar';
import { RepositorioProdutos } from './interface/RepositorioProdutos';

export class RepositorioProdutosEmHttp implements RepositorioProdutos {
    private path: string;

    public constructor() {
        this.path = API.HOST + '/produtos';
    }

    async listar(paginacao: Paginacao): Promise<ProdutosPaginados> {
        const res = await fetch(
            this.path + `?pagina=${paginacao.pagina}&limit=${paginacao.limit}`,
            { credentials: 'include' }
        );

        this.verificarResposta(res);

        const dados = await res.json();

        const produtos: ProdutoParaListar[] = [];

        for (const produto of dados.produtos) {
            produtos.push(
                new ProdutoParaListar(
                    produto.id,
                    produto.foto,
                    produto.nome,
                    produto.preco,
                    produto.precoPromocional
                )
            );
        }

        return new ProdutosPaginados(
            dados.paginaAtual,
            dados.totalPaginas,
            dados.temProx,
            dados.temAnt,
            produtos
        );
    }

    async buscarPorId(id: string): Promise<ProdutoParaDetalhar> {
        const res = await fetch(this.path + `/${id}`, { credentials: 'include' });

        this.verificarResposta(res);

        const dados = await res.json();

        return new ProdutoParaDetalhar(
            dados.id,
            dados.foto,
            dados.nome,
            dados.lancamento,
            dados.descricao,
            dados.preco,
            dados.precoPromocional,
            dados.estoque
        );
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
}
