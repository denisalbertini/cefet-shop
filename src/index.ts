import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import page from 'page';
import { FabricaControladora } from './fabricas/FabricaControladora';

const main = document.querySelector('main')!;

const controladoraProdutos = FabricaControladora.controladoraProdutos();
const controladoraCarrinhos = FabricaControladora.controladoraCarrinhos();

page('/', async (ctx) => {
  const res = await fetch('/pages/listagem.html');

  if (!res.ok) {
    return;
  }

  const html = await res.text();

  main.innerHTML = html;

  const queries = ctx.querystring;

  const parametrosPesquisa = new URLSearchParams(queries);

  const pagina = parametrosPesquisa.get('pagina');
  const limit = parametrosPesquisa.get('limit');

  if (pagina && limit) {
    controladoraProdutos.listar(parseInt(pagina), parseInt(limit));
  } else {
    controladoraProdutos.visaoProdutos.iniciar();
    controladoraCarrinhos.exibirQuantidadeItens();
  }
});

page('/produto/:id', async (ctx) => {
  const res = await fetch('/pages/produto.html');

  if (!res.ok) {
    return;
  }

  const html = await res.text();

  main.innerHTML = html;

  const id = ctx.params.id;

  controladoraProdutos.buscarPorId(id);
});

page('/carrinho', async () => {
  const res = await fetch('/pages/carrinho.html');

  if (!res.ok) {
    return;
  }

  const html = await res.text();

  main.innerHTML = html;

  controladoraCarrinhos.visaoCarrinhos.iniciar();
});

page();
