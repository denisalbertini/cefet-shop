import { Paginacao } from '../tipos/Paginacao';
import { API } from '../util/constantes';
import { verificarRespostaRequisicao } from '../util/verificarRespostaRequisicao';
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
      { credentials: 'include' },
    );

    await verificarRespostaRequisicao(res);

    const dados = await res.json();

    const produtos: ProdutoParaListar[] = [];

    for (const produto of dados.produtos) {
      produtos.push(
        new ProdutoParaListar(
          produto.id,
          produto.foto,
          produto.nome,
          produto.preco,
          produto.precoPromocional,
        ),
      );
    }

    return new ProdutosPaginados(
      dados.paginaAtual,
      dados.totalPaginas,
      dados.temProx,
      dados.temAnt,
      produtos,
    );
  }

  async buscarPorId(id: string): Promise<ProdutoParaDetalhar> {
    const res = await fetch(this.path + `/${id}`, { credentials: 'include' });

    await verificarRespostaRequisicao(res);

    const dados = await res.json();

    return new ProdutoParaDetalhar(
      dados.id,
      dados.foto,
      dados.nome,
      dados.lancamento,
      dados.descricao,
      dados.preco,
      dados.precoPromocional,
      dados.estoque,
    );
  }
}
