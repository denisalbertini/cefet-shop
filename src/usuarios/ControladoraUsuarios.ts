import { RepositorioError } from '../error/RepositorioError';
import { GestorUsuarios } from './GestorUsuarios';
import { VisaoLogin } from './interface/VisaoLogin';
import { VisaoMenuUsuario } from './interface/VisaoMenuUsuario';

export class ControladoraUsuarios {
  private gestorUsuarios: GestorUsuarios;

  constructor(
    private visaoLogin: VisaoLogin,
    private visaoMenuUsuario: VisaoMenuUsuario,
  ) {
    this.gestorUsuarios = new GestorUsuarios();
  }

  exibirLogin(): void {
    this.visaoLogin.exibir();
  }

  async login(identificador: string, senha: string): Promise<void> {
    try {
      await this.gestorUsuarios.login(identificador, senha);

      this.visaoLogin.redirecionar();
    } catch (erro) {
      if (!(erro instanceof Error)) {
        return;
      }

      this.visaoLogin.exibirErro(erro.message);
    }
  }

  async logout(): Promise<void> {
    await this.gestorUsuarios.logout();

    this.visaoLogin.redirecionar();
  }

  async exibirMenu(): Promise<void> {
    try {
      const usuario = await this.gestorUsuarios.buscarUsuarioLogado();

      this.visaoMenuUsuario.exibir(usuario);
    } catch (erro: any) {
      if (!(erro instanceof RepositorioError)) {
        return;
      }

      switch (erro.status) {
        case 400:
        case 404:
          this.visaoMenuUsuario.configurarOpcaoLogin();
          break;
        default:
          break;
      }
    }
  }
}
