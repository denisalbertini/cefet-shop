import { HttpError } from '../error/HttpError';
import { API } from '../util/constantes';
import { RepositorioCompras } from './interface/RepositorioCompras';
import { CompraParaExibir } from './types/CompraParaExibir';

export class RepositorioComprasEmHttp implements RepositorioCompras {
  private path: string;

  constructor() {
    this.path = API.HOST + '/compras';
  }

  async registrar(): Promise<string> {
    const res = await fetch(this.path, {
      method: 'POST',
      credentials: 'include',
    });

    await this.verificarRespostaRequisicao(res);

    const dados = await res.json();

    const id = dados.id;

    return id as string;
  }

  async buscarPorId(id: string): Promise<CompraParaExibir> {
    const res = await fetch(this.path + `/${id}`, { credentials: 'include' });

    await this.verificarRespostaRequisicao(res);

    const dados = await res.json();

    return dados as CompraParaExibir;
  }

  private async verificarRespostaRequisicao(res: Response): Promise<void> {
    if (res.ok) {
      return;
    }

    const dados = await res.json();

    throw new HttpError(res.status, dados.erros);
  }
}
