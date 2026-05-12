import { UsuarioParaExibir } from '../types/UsuarioParaExibir';

export interface VisaoMenuUsuario {
  iniciar(): void;
  exibir(usuario: UsuarioParaExibir): void;
  configurarOpcaoLogin(): void;
}
