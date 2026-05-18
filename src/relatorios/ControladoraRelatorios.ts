import { GestorRelatorios } from './GestorRelatorios';
import { VisaoRelatorios } from './interface/VisaoRelatorios';

export class ControladoraRelatorios {
  private gestor: GestorRelatorios;

  constructor(private visao: VisaoRelatorios) {
    this.gestor = new GestorRelatorios();
  }

  async buscarVendas(inicio: string, fim: string): Promise<void> {
    const relatorio = await this.gestor.buscarVendas(inicio, fim);

    this.visao.exibirVendas(relatorio);
  }

  async buscarTopItens(inicio: string, fim: string): Promise<void> {
    const relatorio = await this.gestor.buscarTopItens(inicio, fim);

    this.visao.exibirTopItens(relatorio);
  }
}
