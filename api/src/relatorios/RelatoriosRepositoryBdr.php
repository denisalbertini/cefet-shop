<?php declare(strict_types=1);

class RelatoriosRepositoryBdr implements RelatoriosRepository
{
  public function __construct(private PDO $pdo) {}

  /**
   * @return VendaPorDataParaHidratar[]
   */
  public function buscarVendasPorPeriodo(Data $inicio, Data $fim): array
  {
    $ps = $this->pdo->prepare(
      'SELECT 
         DATE(FROM_UNIXTIME(c.timestamp)) AS data,
         SUM(c.total) AS total
       FROM compra c
       WHERE c.timestamp >= ? AND c.timestamp <= ?
       GROUP BY DATE(FROM_UNIXTIME(c.timestamp))
       ORDER BY data ASC',
    );

    $ps->execute([$inicio->timestamp, $fim->timestamp]);

    /**
     * @var VendaPorDataParaHidratar[]
     */
    $linhas = $ps->fetchAll(PDO::FETCH_CLASS, VendaPorDataParaHidratar::class);

    return $linhas;
  }

  /**
   * @return ItemMaisVendidoParaHidratar[]
   */
  public function buscarTopItensPorPeriodo(Data $inicio, Data $fim): array
  {
    $ps = $this->pdo->prepare(
      'SELECT 
         p.nome AS nomeProduto,
         COUNT(DISTINCT i.compra_id) AS quantidadeVendas
       FROM item_compra i
       JOIN produto p ON p.id = i.produto_id
       JOIN compra c ON c.id = i.compra_id
       WHERE c.timestamp >= ? AND c.timestamp <= ?
       GROUP BY p.id, p.nome
       ORDER BY quantidadeVendas DESC
       LIMIT 10',
    );

    $ps->execute([$inicio->timestamp, $fim->timestamp]);

    /**
     * @var ItemMaisVendidoParaHidratar[]
     */
    $linhas = $ps->fetchAll(
      PDO::FETCH_CLASS,
      ItemMaisVendidoParaHidratar::class,
    );

    return $linhas;
  }
}
