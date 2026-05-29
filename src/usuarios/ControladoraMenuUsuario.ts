import { TipoErroRepositorio } from '../enum/TipoErroRepositorio';
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
    } catch (error: any) {
      if (!(error instanceof RepositorioError)) {
        console.error(error);
        return;
      }

      switch (error.tipo) {
        case TipoErroRepositorio.DadosInvalidos:
        case TipoErroRepositorio.NaoEncontrado:
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
