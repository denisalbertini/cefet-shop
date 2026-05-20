import { ControladoraCarrinhos } from './carrinhos/ControladoraCarrinhos';
import { VisaoBadgeCarrinhoEmDom } from './carrinhos/VisaoBadgeCarrinhoEmDom';
import { VisaoCarrinhoEmDom } from './carrinhos/VisaoCarrinhoEmDom';
import { ControladoraProdutos } from './produtos/ControladoraProdutos';
import { VisaoDetalheProdutoEmDom } from './produtos/VisaoDetalheProdutoEmDom';
import { VisaoListagemProdutosEmDom } from './produtos/VisaoListagemProdutosEmDom';

const visaoListagemProdutos = new VisaoListagemProdutosEmDom();
const visaoDetalheProduto = new VisaoDetalheProdutoEmDom();
const visaoBadgeCarrinho = new VisaoBadgeCarrinhoEmDom();
const visaoCarrinho = new VisaoCarrinhoEmDom();

const controladoraProdutos = new ControladoraProdutos(
  visaoListagemProdutos,
  visaoDetalheProduto,
  visaoBadgeCarrinho,
);
const controladoraCarrinhos = new ControladoraCarrinhos(
  visaoCarrinho,
  visaoBadgeCarrinho,
);

visaoListagemProdutos.definirControladora(controladoraProdutos);
visaoDetalheProduto.definirControladora(controladoraProdutos);
visaoBadgeCarrinho.definirControladora(controladoraCarrinhos);
visaoCarrinho.definirControladora(controladoraCarrinhos);

export {
  visaoBadgeCarrinho,
  visaoCarrinho,
  visaoDetalheProduto,
  visaoListagemProdutos,
};
