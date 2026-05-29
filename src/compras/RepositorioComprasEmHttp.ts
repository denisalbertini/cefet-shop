import { API } from '../util/constantes';
import { verificarRespostaHttp } from '../util/verificarRespostaHttp';
import { RepositorioCompras } from './interface/RepositorioCompras';
import { CompraParaExibir } from './types/CompraParaExibir';
import { ComprasRealizadas } from './types/ComprasRealizadas';

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

    await verificarRespostaHttp(res);

    const dados = await res.json();

    const id = dados.id;

    return id as string;
  }

  async buscarPorId(id: string): Promise<CompraParaExibir> {
    const res = await fetch(this.path + `/${id}`, { credentials: 'include' });

    await verificarRespostaHttp(res);

    const dados = await res.json();

    return dados as CompraParaExibir;
  }

  async buscar(): Promise<ComprasRealizadas> {
    const res = await fetch(this.path, { credentials: 'include' });

    await verificarRespostaHttp(res);

    const dados = await res.json();

    return dados as ComprasRealizadas;
  }
}
