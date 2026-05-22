<?php declare(strict_types=1);

class ItensCompraRepositoryBdr implements ItensCompraRepository
{
  public function __construct(
    private PDO $pdo,
    private ProdutosRepository $produtosRepository,
  ) {}

  public function registrar(ItemCompra $item, string $compraId): void
  {
    $ps = $this->pdo->prepare(
      'INSERT INTO item_compra (quantidade, subtotal, produto_id, compra_id) 
       VALUES (?, ?, ?, ?)',
    );

    $ps->execute([
      $item->quantidade,
      $item->subtotal->valorCentavos,
      $item->produto->id,
      $compraId,
    ]);
  }

  /**
   * @return ItemCompra[]
   */
  public function buscarPorCompraId(string $id): array
  {
    $ps = $this->pdo->prepare(
      'SELECT id, quantidade, subtotal, produto_id AS produtoId 
       FROM item_compra 
       WHERE compra_id = ?',
    );

    $ps->execute([$id]);

    /**
     * @var ItemCompraParaHidratar[]
     */
    $linhas = $ps->fetchAll(PDO::FETCH_CLASS, ItemCompraParaHidratar::class);

    $itens = [];

    foreach ($linhas as $l) {
      array_push($itens, $this->hidratar($l));
    }

    return $itens;
  }

  private function hidratar(
    ItemCompraParaHidratar $itemCompraParaHidratar,
  ): ItemCompra {
    $produto = $this->produtosRepository->buscarPorId(
      $itemCompraParaHidratar->produtoId,
    );

    $item = new ItemCompra();

    $item->id = $itemCompraParaHidratar->id;
    $item->quantidade = $itemCompraParaHidratar->quantidade;
    $item->subtotal = new Cefetin($itemCompraParaHidratar->subtotal);
    $item->produto = $produto;

    return $item;
  }
}
