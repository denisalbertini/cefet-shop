import { GestorCompras } from './GestorCompras';
import { VisaoCompraFinalizada } from './interface/VisaoCompraFinalizada';

export class ControladoraCompraFinalizada {
  private gestor: GestorCompras;

  constructor(private visao: VisaoCompraFinalizada) {
    this.gestor = new GestorCompras();
  }

  async exibir(id: string): Promise<void> {
    const compra = await this.gestor.buscarPorId(id);

    this.visao.exibir(compra);
  }
}
