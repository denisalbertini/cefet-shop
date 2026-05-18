import { RepositorioRelatorios } from './interface/RepositorioRelatorios';
import { RepositorioRelatoriosEmHttp } from './RepositorioRelatoriosEmHttp';
import { RelatorioTopItens } from './types/RelatorioTopItens';
import { RelatorioVendas } from './types/RelatorioVendas';

export class GestorRelatorios {
  constructor(
    private repositorioRelatorios: RepositorioRelatorios = new RepositorioRelatoriosEmHttp(),
  ) {}

  async buscarVendas(inicio: string, fim: string): Promise<RelatorioVendas> {
    return await this.repositorioRelatorios.buscarVendas(inicio, fim);
  }

  async buscarTopItens(
    inicio: string,
    fim: string,
  ): Promise<RelatorioTopItens> {
    return await this.repositorioRelatorios.buscarTopItens(inicio, fim);
  }
}
