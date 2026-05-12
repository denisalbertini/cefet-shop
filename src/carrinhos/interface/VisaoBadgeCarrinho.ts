export interface VisaoBadgeCarrinho {
  iniciar(): void;
  exibir(quantidade: number): void;
  atualizar(quantidade: number): void;
  decrementar(): void;
}
