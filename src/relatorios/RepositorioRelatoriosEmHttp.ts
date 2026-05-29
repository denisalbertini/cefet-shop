import { API } from '../util/constantes';
import { verificarRespostaHttp } from '../util/verificarRespostaHttp';
import { RepositorioRelatorios } from './interface/RepositorioRelatorios';
import { RelatorioTopItens } from './types/RelatorioTopItens';
import { RelatorioVendas } from './types/RelatorioVendas';

export class RepositorioRelatoriosEmHttp implements RepositorioRelatorios {
  private path: string;

  constructor() {
    this.path = API.HOST + '/relatorios';
  }

  async buscarVendas(inicio: string, fim: string): Promise<RelatorioVendas> {
    const res = await fetch(this.path + `/vendas?inicio=${inicio}&fim=${fim}`, {
      credentials: 'include',
    });

    await verificarRespostaHttp(res);

    const dados = await res.json();

    return dados as RelatorioVendas;
  }

  async buscarTopItens(
    inicio: string,
    fim: string,
  ): Promise<RelatorioTopItens> {
    const res = await fetch(
      this.path + `/top-itens?inicio=${inicio}&fim=${fim}`,
      { credentials: 'include' },
    );

    await verificarRespostaHttp(res);

    const dados = await res.json();

    return dados as RelatorioTopItens;
  }
}
