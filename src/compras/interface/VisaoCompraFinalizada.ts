import { CompraParaExibir } from '../types/CompraParaExibir';

export interface VisaoCompraFinalizada {
  iniciar(id: string): void;
  exibir(compra: CompraParaExibir): void;
}
