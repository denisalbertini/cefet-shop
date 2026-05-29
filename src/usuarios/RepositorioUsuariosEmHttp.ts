import { API } from '../util/constantes';
import { verificarRespostaHttp } from '../util/verificarRespostaHttp';
import { RepositorioUsuarios } from './interface/RepositorioUsuarios';
import { UsuarioParaExibir } from './types/UsuarioParaExibir';

export class RepositorioUsuariosEmHttp implements RepositorioUsuarios {
  private path;

  constructor() {
    this.path = API.HOST + '/usuarios';
  }

  async login(identificador: string, senha: string): Promise<void> {
    const res = await fetch(this.path + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identificador, senha }),
      credentials: 'include',
    });

    await verificarRespostaHttp(res);
  }

  async logout(): Promise<void> {
    const res = await fetch(this.path + '/logout', { credentials: 'include' });

    await verificarRespostaHttp(res);
  }

  async buscarUsuarioLogado(): Promise<UsuarioParaExibir> {
    const res = await fetch(this.path, { credentials: 'include' });

    await verificarRespostaHttp(res);

    const dados = await res.json();

    return dados as UsuarioParaExibir;
  }
}
