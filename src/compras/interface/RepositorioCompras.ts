import { CompraParaExibir } from '../types/CompraParaExibir';
import { ComprasRealizadas } from '../types/ComprasRealizadas';

export interface RepositorioCompras {
  registrar(): Promise<string>;
  buscarPorId(id: string): Promise<CompraParaExibir>;
  buscar(): Promise<ComprasRealizadas>;
}
