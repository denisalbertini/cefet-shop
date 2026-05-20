import { GestorUsuarios } from './GestorUsuarios';
import { VisaoLogin } from './interface/VisaoLogin';

export class ControladoraLogin {
  private gestor: GestorUsuarios;

  constructor(private visao: VisaoLogin) {
    this.gestor = new GestorUsuarios();
  }

  exibir(): void {
    this.visao.exibir();
  }

  async login(identificador: string, senha: string): Promise<void> {
    try {
      await this.gestor.login(identificador, senha);

      this.visao.redirecionar();
    } catch (erro) {
      if (!(erro instanceof Error)) {
        return;
      }

      this.visao.exibirErro(erro.message);
    }
  }
}
