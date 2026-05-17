import { CompraParaExibir } from '../types/CompraParaExibir';

export interface RepositorioCompras {
  registrar(): Promise<string>;
  buscarPorId(id: string): Promise<CompraParaExibir>;
}
