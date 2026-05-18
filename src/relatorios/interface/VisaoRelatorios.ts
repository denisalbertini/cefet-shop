import { RelatorioTopItens } from '../types/RelatorioTopItens';
import { RelatorioVendas } from '../types/RelatorioVendas';

export interface VisaoRelatorios {
  iniciar(): void;
  exibirVendas(relatorio: RelatorioVendas): void;
  exibirTopItens(relatorio: RelatorioTopItens): void;
}
