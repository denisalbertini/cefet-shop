import { RepositorioError } from '../error/RepositorioError';
import { MENSAGEM_ERRO } from '../util/constantes';
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
    } catch (error: any) {
      const erros: string[] = [];

      if (!(error instanceof RepositorioError)) {
        console.error(error);
        erros.push(MENSAGEM_ERRO.ERRO_INESPERADO);
      } else {
        erros.push(...error.erros);
      }

      this.visao.exibirErros(erros);
    }
  }
}
