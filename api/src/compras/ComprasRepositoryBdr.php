<?php declare(strict_types=1);

class ComprasRepositoryBdr implements ComprasRepository
{
  public function __construct(
    private PDO $pdo,
    private UsuariosRepository $usuariosRepository,
  ) {}

  public function registrar(Compra $compra): string
  {
    $ps = $this->pdo->prepare(
      'INSERT INTO compra (numero_compra, timestamp, total, usuario_id) 
       VALUES (?, ?, ?, ?)',
    );

    $ps->execute([
      $compra->numeroCompra,
      $compra->data->timestamp,
      $compra->total->valorCentavos,
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

  public function buscarPorId(string $id): Compra
  {
    $ps = $this->pdo->prepare(
      'SELECT * FROM compra_para_hidratar WHERE id = ?',
    );

    $ps->execute([$id]);

    $ps->setFetchMode(PDO::FETCH_CLASS, CompraParaHidratar::class);

    $compraParaHidratar = $ps->fetch();

    if (!($compraParaHidratar instanceof CompraParaHidratar)) {
      throw new HttpException(404);
    }

    return $this->hidratar($compraParaHidratar);
  }

  /**
   * @return Compra[]
   */
  public function buscarPorUsuario(string $usuarioId): array
  {
    $ps = $this->pdo->prepare(
      'SELECT * FROM compra_para_hidratar 
       WHERE usuarioId = ? 
       ORDER BY timestamp DESC',
    );

    $ps->execute([$usuarioId]);

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
    $compra->total = new Cefetin($compraParaHidratar->total);

    $usuario = $this->usuariosRepository->buscarPorId(
      $compraParaHidratar->usuarioId,
    );

    $compra->usuario = $usuario;

    return $compra;
  }
}
