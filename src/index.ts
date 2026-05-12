import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import page from 'page';
import { buscarHtml } from './util/buscarHtml';
import { VISAO_PRODUTOS } from './util/constantes';
import {
  visaoBadgeCarrinho,
  visaoCarrinho,
  visaoDetalheProduto,
  visaoListagemProdutos,
  visaoLogin,
  visaoMenuUsuario,
} from './visoes';

const main = document.querySelector('main')!;

page('/', async (ctx) => {
  const html = await buscarHtml('/pages/listagem.html');

  main.innerHTML = html;

  const queries = ctx.querystring;

  const parametrosPesquisa = new URLSearchParams(queries);

  const pagina = parseInt(parametrosPesquisa.get('pagina') ?? '1');
  const limit = parseInt(
    parametrosPesquisa.get('limit') ??
      VISAO_PRODUTOS.PRODUTOS_POR_PAGINA.toString(),
  );

  visaoMenuUsuario.iniciar();
  visaoBadgeCarrinho.iniciar();
  visaoListagemProdutos.iniciar(pagina, limit);
});

page('/produto/:id', async (ctx) => {
  const html = await buscarHtml('/pages/produto.html');

  main.innerHTML = html;

  const id = ctx.params.id as string;

  visaoDetalheProduto.iniciar(id);
});

page('/carrinho', async () => {
  const html = await buscarHtml('/pages/carrinho.html');

  main.innerHTML = html;

  visaoCarrinho.iniciar();
});

page('/login', async () => {
  const html = await buscarHtml('/pages/login.html');

  main.innerHTML = html;

  visaoLogin.iniciar();
});

page();
