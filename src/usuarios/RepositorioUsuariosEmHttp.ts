import { API } from '../util/constantes';
import { verificarRespostaRequisicao } from '../util/verificarRespostaRequisicao';
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

    await verificarRespostaRequisicao(res);
  }

  async logout(): Promise<void> {
    const res = await fetch(this.path + '/logout', { credentials: 'include' });

    await verificarRespostaRequisicao(res);
  }

  async buscarUsuarioLogado(): Promise<UsuarioParaExibir> {
    const res = await fetch(this.path, { credentials: 'include' });

    await verificarRespostaRequisicao(res);

    const dados = await res.json();

    return dados as UsuarioParaExibir;
  }
}
