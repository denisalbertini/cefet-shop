import { navegarPara } from '../util/navegarPara';
import { ControladoraUsuarios } from './ControladoraUsuarios';
import { VisaoLogin } from './interface/VisaoLogin';

export class VisaoLoginEmDom implements VisaoLogin {
  private controladoraUsuarios?: ControladoraUsuarios;

  definirControladora(controladoraUsuarios: ControladoraUsuarios): void {
    this.controladoraUsuarios = controladoraUsuarios;
  }

  iniciar(): void {
    this.controladoraUsuarios?.exibirLogin();
  }

  exibir(): void {
    const botaoLogin = document.getElementById('login');

    botaoLogin?.classList.add('invisible');

    const botaoEntrar = document.getElementById('entrar') as HTMLButtonElement;

    botaoEntrar.addEventListener('click', (event) => {
      event.preventDefault();

      const form = document.querySelector('form')!;
      const formData = new FormData(form);

      const identificador = formData.get('identificador')!;
      const senha = formData.get('senha')!;

      this.controladoraUsuarios?.login(
        identificador.toString(),
        senha.toString(),
      );
    });
  }

  redirecionar(): void {
    const parametrosPesquisa = new URLSearchParams(window.location.search);

    const carrinho = parametrosPesquisa.get('carrinho') === 'true';

    const destino = carrinho ? '/carrinho' : '/';

    navegarPara(destino);

    if (carrinho) {
      this.controladoraUsuarios?.exibirMenu();
    }
  }

  exibirErro(erro: string): void {
    const template = document.querySelector('template')!;

    const alert = template.content.cloneNode(true) as HTMLElement;

    const mensagem = alert.querySelector('p')!;

    mensagem.textContent = erro;

    const alerta = document.getElementById('alerta')!;

    alerta.replaceChildren(alert);
  }
}
