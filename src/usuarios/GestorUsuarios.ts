import { RepositorioUsuarios } from './interface/RepositorioUsuarios';
import { RepositorioUsuariosEmHttp } from './RepositorioUsuariosEmHttp';
import { UsuarioParaExibir } from './types/UsuarioParaExibir';

export class GestorUsuarios {
  constructor(
    private repositorioUsuarios: RepositorioUsuarios = new RepositorioUsuariosEmHttp(),
  ) {}

  async login(identificador: string, senha: string): Promise<void> {
    await this.repositorioUsuarios.login(identificador, senha);
  }

  async logout(): Promise<void> {
    await this.repositorioUsuarios.logout();
  }

  async buscarUsuarioLogado(): Promise<UsuarioParaExibir> {
    return await this.repositorioUsuarios.buscarUsuarioLogado();
  }
}
