import { UsuarioParaExibir } from '../types/UsuarioParaExibir';

export interface RepositorioUsuarios {
  login(identificador: string, senha: string): Promise<void>;
  logout(): Promise<void>;
  buscarUsuarioLogado(): Promise<UsuarioParaExibir>;
}
