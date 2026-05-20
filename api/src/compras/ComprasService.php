<?php declare(strict_types=1);

class ComprasService
{
  public function __construct(
    private Sessao $sessao,
    private UsuariosRepository $usuariosRepository,
    private CarrinhosRepository $carrinhosRepository,
    private ItensRepository $itensRepository,
    private ProdutosRepository $produtosRepository,
    private ComprasRepository $comprasRepository,
  ) {}

  public function registrar(): string
  {
    $usuarioId = $this->sessao->obter(ChaveSessao::USUARIO);

    $logado = is_string($usuarioId);

    if (!$logado) {
      throw new HttpException(401);
    }

    $usuario = $this->usuariosRepository->buscarPorId($usuarioId);

    $carrinho = $this->carrinhosRepository->buscar();

    if (
      $usuario->saldo->valorCentavos < $carrinho->obterTotal()->valorCentavos
    ) {
      throw new HttpException(
        400,
        MensagemErro::COMPRAS_SERVICE_SALDO_INSUFICIENTE,
      );
    }

    $erros = [];

    $ItemFoiAlterado = false;
    $ItemFoiRemovido = false;

    foreach ($carrinho->itens as $item) {
      $produto = $this->produtosRepository->buscarPorId($item->produto->id);

      $item->produto = $produto;

      if ($produto->estoque === 0) {
        $this->carrinhosRepository->removerItem($produto->id);

        $ItemFoiRemovido = true;
      } elseif ($produto->estoque < $item->quantidade) {
        $item->quantidade = $produto->estoque;

        $this->carrinhosRepository->alterar($item);

        $ItemFoiAlterado = true;
      }
    }

    if ($ItemFoiAlterado) {
      array_push($erros, MensagemErro::COMPRAS_SERVICE_ITEM_ALTERADO);
    }

    if ($ItemFoiRemovido) {
      array_push($erros, MensagemErro::COMPRAS_SERVICE_ITEM_REMOVIDO);
    }

    if (!empty($erros)) {
      $this->carrinhosRepository->salvar($carrinho);

      throw new HttpException(400, ...$erros);
    }

    $usuario->saldo->subtrair($carrinho->obterTotal());

    $this->usuariosRepository->atualizarSaldo($usuario);

    $compra = new Compra();

    $timestamp = time();

    $compra->numeroCompra = $timestamp;
    $compra->data = new Data($timestamp);
    $compra->usuario = $usuario;
    $compra->total = $carrinho->obterTotal();

    $compraId = $this->comprasRepository->registrar($compra);

    foreach ($carrinho->itens as $item) {
      $produto = $item->produto;
      $quantidade = $item->quantidade;

      $produto->estoque -= $quantidade;
      $produto->quantidadeTotalVendida += $quantidade;

      $this->itensRepository->registrar($item, $compraId);
      $this->produtosRepository->atualizarPosCompra($produto);
    }

    $carrinho->esvaziar();

    $this->carrinhosRepository->salvar($carrinho);

    return $compraId;
  }

  public function buscarPorId(string $id): CompraParaExibir
  {
    $compra = $this->comprasRepository->buscarPorId($id);

    $itens = $this->itensRepository->buscarPorCompraId($id);

    $compra->itens = $itens;

    return new CompraParaExibir($compra);
  }

  public function buscarPorUsuario(): ComprasRealizadas
  {
    $usuarioId = $this->sessao->obter(ChaveSessao::USUARIO);

    $logado = is_string($usuarioId);

    if (!$logado) {
      throw new HttpException(401);
    }

    $compras = $this->comprasRepository->buscarPorUsuario($usuarioId);

    foreach ($compras as $compra) {
      $itens = $this->itensRepository->buscarPorCompraId($compra->id);

      $compra->itens = $itens;
    }

    return new ComprasRealizadas($compras);
  }
}
