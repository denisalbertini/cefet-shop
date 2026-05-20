import { ComprasRealizadas } from '../types/ComprasRealizadas';

export interface VisaoComprasRealizadas {
  iniciar(): void;
  exibir(comprasRealizadas: ComprasRealizadas): void;
  redirecionar(): void;
}
