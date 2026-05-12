import { Papel } from '../enum/Papel';
import { ControladoraUsuarios } from './ControladoraUsuarios';
import { VisaoMenuUsuario } from './interface/VisaoMenuUsuario';
import { UsuarioParaExibir } from './types/UsuarioParaExibir';

export class VisaoMenuUsuarioEmDom implements VisaoMenuUsuario {
  private controladoraUsuarios?: ControladoraUsuarios;

  definirControladora(controladoraUsuarios: ControladoraUsuarios): void {
    this.controladoraUsuarios = controladoraUsuarios;
  }

  iniciar(): void {
    this.controladoraUsuarios?.exibirMenu();
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

        location.href = '/compras';
      });
    }

    if (usuario.papel === Papel.Funcionario) {
      const botaoRelatorios = document.getElementById(
        'relatorios',
      ) as HTMLAnchorElement;

      botaoRelatorios.addEventListener('click', (event) => {
        event.preventDefault();

        location.href = '/relatorios';
      });

      const itemRelatorios = document.getElementById('item-relatorios');

      itemRelatorios?.classList.remove('d-none');
    }

    const botaoLogout = document.getElementById('logout') as HTMLAnchorElement;

    botaoLogout.addEventListener('click', (event) => {
      event.preventDefault();

      this.controladoraUsuarios?.logout();
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

      location.href = '/login';
    });
  }
}
