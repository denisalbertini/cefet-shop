import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import page from 'page';
import { VISAO_PRODUTOS } from './util/constantes';
import { navegarPara } from './util/navegarPara';
import { preencherMain } from './util/preencherMain';
import {
  visaoBadgeCarrinho,
  visaoCarrinho,
  visaoDetalheProduto,
  visaoListagemProdutos,
  visaoLogin,
  visaoMenuUsuario,
} from './visoes';

page('*', (_ctx, next) => {
  visaoMenuUsuario.iniciar();
  visaoBadgeCarrinho.iniciar();

  next();
});

page('/', async (ctx) => {
  await preencherMain('/pages/listagem.html');

  const queries = ctx.querystring;

  const parametrosPesquisa = new URLSearchParams(queries);

  const pagina = parseInt(parametrosPesquisa.get('pagina') ?? '1');
  const limit = parseInt(
    parametrosPesquisa.get('limit') ??
      VISAO_PRODUTOS.PRODUTOS_POR_PAGINA.toString(),
  );

  visaoListagemProdutos.iniciar(pagina, limit);
});

page('/produto/:id', async (ctx) => {
  await preencherMain('/pages/produto.html');

  const id = ctx.params.id as string;

  visaoDetalheProduto.iniciar(id);
});

page('/carrinho', async () => {
  await preencherMain('/pages/carrinho.html');

  visaoCarrinho.iniciar();
});

page('/login', async () => {
  await preencherMain('/pages/login.html');

  visaoLogin.iniciar();
});

page('/compra/:id', async (ctx) => {
  await preencherMain('/pages/compra-finalizada.html');

  const id = ctx.params.id as string;

  const visao = (await import('./compras/VisaoCompraFinalizadaEmDom.js'))
    .VisaoCompraFinalizadaEmDom;

  new visao().iniciar(id);
});

page('/compras', async () => {
  await preencherMain('/pages/compras-realizadas.html');

  const visao = (await import('./compras/VisaoComprasRealizadasEmDom.js'))
    .VisaoComprasRealizadasEmDom;

  new visao().iniciar();
});

page('/relatorios', async () => {
  await preencherMain('/pages/relatorios.html');

  const visao = (await import('./relatorios/VisaoRelatoriosEmDom.js'))
    .VisaoRelatoriosEmDom;

  new visao().iniciar();
});

page('*', () => navegarPara('/'));

page();
