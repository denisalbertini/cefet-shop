<?php declare(strict_types=1);

class ComprasRepositoryBdr implements ComprasRepository
{
  public function __construct(private PDO $pdo) {}

  public function registrar(Compra $compra): string
  {
    $ps = $this->pdo->prepare(
      'INSERT INTO compra (numero_compra, timestamp, usuario_id) VALUES (?, ?, ?)',
    );

    $ps->execute([
      $compra->numeroCompra,
      $compra->data->timestamp,
      $compra->usuario->id,
    ]);

    $ps = $this->pdo->prepare('SELECT id FROM compra WHERE numero_compra = ?');

    $ps->execute([$compra->numeroCompra]);

    /**
     * @var string[]
     */
    $linha = $ps->fetch(PDO::FETCH_ASSOC);

    $id = $linha['id'];

    return $id;
  }

  /**
   * @return Compra[]
   */
  public function buscarPorPeriodo(Data $inicio, Data $fim): array
  {
    $ps = $this->pdo->prepare(
      'SELECT id, numero_compra AS numeroCompra, timestamp FROM compra 
       WHERE timestamp >= ? AND timestamp <= ?',
    );

    $ps->execute([$inicio, $fim]);

    /**
     * @var CompraParaHidratar[]
     */
    $linhas = $ps->fetchAll(PDO::FETCH_CLASS, CompraParaHidratar::class);

    if (empty($linhas)) {
      throw new HttpException(404);
    }

    $compras = [];

    foreach ($linhas as $l) {
      array_push($compras, $this->hidratar($l));
    }

    return $compras;
  }

  private function hidratar(CompraParaHidratar $compraParaHidratar): Compra
  {
    $compra = new Compra();

    $compra->id = $compraParaHidratar->id;
    $compra->numeroCompra = $compraParaHidratar->numeroCompra;
    $compra->data = new Data($compraParaHidratar->timestamp);

    return $compra;
  }
}
