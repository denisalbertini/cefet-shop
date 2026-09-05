<?php declare(strict_types=1);

class ComprasService
{
  public function __construct(
    private Sessao $sessao,
    private UsuariosRepository $usuariosRepository,
    private CarrinhosRepository $carrinhosRepository,
    private ItensCompraRepository $itensCompraRepository,
    private ProdutosRepository $produtosRepository,
    private ComprasRepository $comprasRepository,
    private UnidadeTransacional $transacao,
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

    if (empty($carrinho->itens)) {
      throw new HttpException(
        400,
        MensagemErro::COMPRAS_SERVICE_CARRINHO_VAZIO,
      );
    }

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

    try {
      $this->transacao->iniciar();

      $this->usuariosRepository->subtrairSaldo(
        $usuario,
        $carrinho->obterTotal()->valorCentavos,
      );

      $compra = new Compra();

      $timestamp = time();

      $compra->numeroCompra = $timestamp;
      $compra->data = new Data($timestamp);
      $compra->usuario = $usuario;
      $compra->total = $carrinho->obterTotal();

      $compraId = $this->comprasRepository->registrar($compra);

      foreach ($carrinho->itens as $item) {
        $quantidade = $item->quantidade;

        $itemCompra = new ItemCompra();

        $itemCompra->quantidade = $quantidade;
        $itemCompra->subtotal = $item->obterSubTotal();
        $itemCompra->produto = $item->produto;

        $this->itensCompraRepository->registrar($itemCompra, $compraId);

        $produto = $item->produto;

        $produto->estoque -= $quantidade;
        $produto->quantidadeTotalVendida += $quantidade;

        $this->produtosRepository->atualizarPosCompra($produto);
      }

      $this->transacao->confirmar();
    } catch (Exception $e) {
      $this->transacao->reverter();

      throw $e;
    }

    $carrinho->esvaziar();

    $this->carrinhosRepository->salvar($carrinho);

    return $compraId;
  }

  public function buscarPorId(string $id): CompraParaExibir
  {
    $compra = $this->comprasRepository->buscarPorId($id);

    $itens = $this->itensCompraRepository->buscarPorCompraId($id);

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
      $itens = $this->itensCompraRepository->buscarPorCompraId($compra->id);

      $compra->itens = $itens;
    }

    return new ComprasRealizadas($compras);
  }
}
