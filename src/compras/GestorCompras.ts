import { RepositorioCompras } from './interface/RepositorioCompras';
import { RepositorioComprasEmHttp } from './RepositorioComprasEmHttp';
import { CompraParaExibir } from './types/CompraParaExibir';

export class GestorCompras {
  constructor(
    private repositorioCompras: RepositorioCompras = new RepositorioComprasEmHttp(),
  ) {}

  async registrar(): Promise<string> {
    return await this.repositorioCompras.registrar();
  }

  async buscarPorId(id: string): Promise<CompraParaExibir> {
    return await this.repositorioCompras.buscarPorId(id);
  }
}
