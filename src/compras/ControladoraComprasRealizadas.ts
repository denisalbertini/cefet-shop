import { TipoErroRepositorio } from '../enum/TipoErroRepositorio';
import { RepositorioError } from '../error/RepositorioError';
import { GestorCompras } from './GestorCompras';
import { VisaoComprasRealizadas } from './interface/VisaoComprasRealizadas';

export class ControladoraComprasRealizadas {
  private gestor: GestorCompras;

  constructor(private visao: VisaoComprasRealizadas) {
    this.gestor = new GestorCompras();
  }

  async exibir(): Promise<void> {
    try {
      const comprasRealizadas = await this.gestor.buscar();

      this.visao.exibir(comprasRealizadas);
    } catch (error) {
      if (!(error instanceof RepositorioError)) {
        console.error(error);
        return;
      }

      switch (error.tipo) {
        case TipoErroRepositorio.NaoAutorizado:
          this.visao.redirecionar();
          break;
        case TipoErroRepositorio.NaoEncontrado:
          this.visao.exibirVazio();
          break;
        default:
          break;
      }
    }
  }
}
