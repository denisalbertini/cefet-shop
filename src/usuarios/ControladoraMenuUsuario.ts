import { RepositorioError } from '../error/RepositorioError';
import { GestorUsuarios } from './GestorUsuarios';
import { VisaoMenuUsuario } from './interface/VisaoMenuUsuario';

export class ControladoraMenuUsuario {
  private gestor: GestorUsuarios;

  constructor(private visao: VisaoMenuUsuario) {
    this.gestor = new GestorUsuarios();
  }

  async exibir(): Promise<void> {
    try {
      const usuario = await this.gestor.buscarUsuarioLogado();

      this.visao.exibir(usuario);
    } catch (erro: any) {
      if (!(erro instanceof RepositorioError)) {
        return;
      }

      switch (erro.status) {
        case 400:
        case 404:
          this.visao.configurarOpcaoLogin();
          break;
        default:
          break;
      }
    }
  }

  async logout(): Promise<void> {
    await this.gestor.logout();

    this.visao.recarregar();
  }
}
