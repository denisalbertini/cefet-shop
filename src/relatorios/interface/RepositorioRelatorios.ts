import { RelatorioTopItens } from '../types/RelatorioTopItens';
import { RelatorioVendas } from '../types/RelatorioVendas';

export interface RepositorioRelatorios {
  buscarVendas(inicio: string, fim: string): Promise<RelatorioVendas>;
  buscarTopItens(inicio: string, fim: string): Promise<RelatorioTopItens>;
}
