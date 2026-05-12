export interface VisaoLogin {
  iniciar(): void;
  exibir(): void;
  redirecionar(): void;
  exibirErro(erro: string): void;
}
