import { HttpError } from '../error/HttpError';
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
      if (!(error instanceof HttpError)) {
        console.error(error);
        return;
      }

      switch (error.status) {
        case 401:
          this.visao.redirecionar();
          break;
        case 404:
          this.visao.exibirVazio();
          break;
        default:
          break;
      }
    }
  }
}
