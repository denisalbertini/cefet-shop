<?php declare(strict_types=1);

class ItensRepositoryBdr implements ItensRepository
{
  public function __construct(
    private PDO $pdo,
    private ProdutosRepository $produtosRepository,
  ) {}

  public function registrar(Item $item, string $compraId): void
  {
    $ps = $this->pdo->prepare(
      'INSERT INTO item (quantidade, produto_id, compra_id) VALUES (?, ?, ?)',
    );

    $ps->execute([$item->quantidade, $item->produto->id, $compraId]);
  }

  /**
   * @return Item[]
   */
  public function buscarPorCompraId(string $id): array
  {
    $ps = $this->pdo->prepare(
      'SELECT id, quantidade, produto_id AS produtoId FROM item WHERE compra_id = ?',
    );

    $ps->execute([$id]);

    /**
     * @var ItemParaHidratar[]
     */
    $linhas = $ps->fetchAll(PDO::FETCH_CLASS, ItemParaHidratar::class);

    $itens = [];

    foreach ($linhas as $l) {
      array_push($itens, $this->hidratar($l));
    }

    return $itens;
  }

  private function hidratar(ItemParaHidratar $itemParaHidratar): Item
  {
    $produto = $this->produtosRepository->buscarPorId(
      $itemParaHidratar->produtoId,
    );

    $item = new Item($itemParaHidratar->quantidade, $produto);

    $item->id = $itemParaHidratar->id;

    return $item;
  }
}
