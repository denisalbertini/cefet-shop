import { Papel } from '../enum/Papel';
import { navegarPara } from '../util/navegarPara';
import { ControladoraMenuUsuario } from './ControladoraMenuUsuario';
import { VisaoMenuUsuario } from './interface/VisaoMenuUsuario';
import { UsuarioParaExibir } from './types/UsuarioParaExibir';

export class VisaoMenuUsuarioEmDom implements VisaoMenuUsuario {
  private controladora: ControladoraMenuUsuario;

  constructor() {
    this.controladora = new ControladoraMenuUsuario(this);
  }

  iniciar(): void {
    this.controladora.exibir();
  }

  exibir(usuario: UsuarioParaExibir): void {
    const nome = document.getElementById('nome-usuario') as HTMLSpanElement;

    nome.textContent = usuario.nome;

    if (usuario.papel === Papel.Gestor) {
      const itemSuasCompras = document.getElementById('item-suas-compras');

      itemSuasCompras?.classList.add('d-none');
    } else {
      const botaoCompras = document.getElementById(
        'compras',
      ) as HTMLAnchorElement;

      botaoCompras.addEventListener('click', (event) => {
        event.preventDefault();

        navegarPara('/compras');
      });
    }

    if (usuario.papel === Papel.Funcionario) {
      const botaoRelatorios = document.getElementById(
        'relatorios',
      ) as HTMLAnchorElement;

      botaoRelatorios.addEventListener('click', (event) => {
        event.preventDefault();

        navegarPara('/relatorios');
      });

      const itemRelatorios = document.getElementById('item-relatorios');

      itemRelatorios?.classList.remove('d-none');
    }

    const botaoLogout = document.getElementById('logout') as HTMLAnchorElement;

    botaoLogout.addEventListener('click', (event) => {
      event.preventDefault();

      this.controladora.logout();
    });

    const botaoLogin = document.getElementById('login');

    botaoLogin?.classList.add('d-none');

    const menu = document.querySelector('.dropdown');

    menu?.classList.remove('d-none');
  }

  configurarOpcaoLogin(): void {
    const botaoLogin = document.getElementById('login') as HTMLButtonElement;

    botaoLogin.addEventListener('click', (event) => {
      event.preventDefault();

      navegarPara('/login');
    });
  }

  recarregar(): void {
    location.reload();
  }
}
