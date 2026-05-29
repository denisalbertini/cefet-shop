import { navegarPara } from '../util/navegarPara';
import { ControladoraLogin } from './ControladoraLogin';
import { VisaoLogin } from './interface/VisaoLogin';

export class VisaoLoginEmDom implements VisaoLogin {
  private controladora: ControladoraLogin;

  constructor() {
    this.controladora = new ControladoraLogin(this);
  }

  iniciar(): void {
    this.controladora.exibir();
  }

  exibir(): void {
    const botaoEntrar = document.getElementById('entrar') as HTMLButtonElement;

    botaoEntrar.addEventListener('click', (event) => {
      event.preventDefault();

      const form = document.querySelector('form')!;
      const formData = new FormData(form);

      const identificador = formData.get('identificador')!;
      const senha = formData.get('senha')!;

      this.controladora.login(identificador.toString(), senha.toString());
    });
  }

  redirecionar(): void {
    const parametrosPesquisa = new URLSearchParams(window.location.search);

    const carrinho = parametrosPesquisa.get('carrinho') === 'true';

    const destino = carrinho ? '/carrinho' : '/';

    navegarPara(destino);
  }

  recarregar(): void {
    location.reload();
  }

  exibirErros(erros: string[]): void {
    const template = document.querySelector('template')!;

    const fragmento = document.createDocumentFragment();

    for (const erro of erros) {
      const alert = template.content.cloneNode(true) as HTMLElement;

      const mensagem = alert.querySelector('p')!;

      mensagem.textContent = erro;

      fragmento.appendChild(alert);
    }

    const alertas = document.getElementById('alertas')!;

    alertas.replaceChildren(fragmento);
  }
}
