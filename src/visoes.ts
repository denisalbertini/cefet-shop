import { ControladoraCarrinhos } from './carrinhos/ControladoraCarrinhos';
import { VisaoBadgeCarrinhoEmDom } from './carrinhos/VisaoBadgeCarrinhoEmDom';
import { VisaoCarrinhoEmDom } from './carrinhos/VisaoCarrinhoEmDom';
import { ControladoraProdutos } from './produtos/ControladoraProdutos';
import { VisaoDetalheProdutoEmDom } from './produtos/VisaoDetalheProdutoEmDom';
import { VisaoListagemProdutosEmDom } from './produtos/VisaoListagemProdutosEmDom';
import { ControladoraUsuarios } from './usuarios/ControladoraUsuarios';
import { VisaoLoginEmDom } from './usuarios/VisaoLoginEmDom';
import { VisaoMenuUsuarioEmDom } from './usuarios/VisaoMenuUsuarioEmDom';

const visaoListagemProdutos = new VisaoListagemProdutosEmDom();
const visaoDetalheProduto = new VisaoDetalheProdutoEmDom();
const visaoBadgeCarrinho = new VisaoBadgeCarrinhoEmDom();
const visaoCarrinho = new VisaoCarrinhoEmDom();
const visaoLogin = new VisaoLoginEmDom();
const visaoMenuUsuario = new VisaoMenuUsuarioEmDom();

const controladoraProdutos = new ControladoraProdutos(
  visaoListagemProdutos,
  visaoDetalheProduto,
  visaoBadgeCarrinho,
);
const controladoraCarrinhos = new ControladoraCarrinhos(
  visaoCarrinho,
  visaoBadgeCarrinho,
);
const controladoraUsuarios = new ControladoraUsuarios(
  visaoLogin,
  visaoMenuUsuario,
);

visaoListagemProdutos.definirControladora(controladoraProdutos);
visaoDetalheProduto.definirControladora(controladoraProdutos);
visaoBadgeCarrinho.definirControladora(controladoraCarrinhos);
visaoCarrinho.definirControladora(controladoraCarrinhos);
visaoLogin.definirControladora(controladoraUsuarios);
visaoMenuUsuario.definirControladora(controladoraUsuarios);

export {
  visaoBadgeCarrinho,
  visaoCarrinho,
  visaoDetalheProduto,
  visaoListagemProdutos,
  visaoLogin,
  visaoMenuUsuario,
};
