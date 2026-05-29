export interface VisaoLogin {
  iniciar(): void;
  exibir(): void;
  redirecionar(): void;
  exibirErros(erros: string[]): void;
}
