<?php declare(strict_types=1);

class ComprasRealizadas
{
  public string $totalGasto;
  /**
   * @var CompraParaExibir[]
   */
  public array $compras;

  /**
   * @param Compra[] $compras
   */
  public function __construct(array $compras)
  {
    $this->definirAtributos($compras);
  }

  /**
   * @param Compra[] $compras
   */
  private function definirAtributos(array $compras): void
  {
    $totalGasto = new Cefetin(0);
    $comprasParaExibir = [];

    foreach ($compras as $compra) {
      $totalGasto->somar($compra->total);

      array_push($comprasParaExibir, new CompraParaExibir($compra));
    }

    $this->totalGasto = $totalGasto->obterValorFormatado();
    $this->compras = $comprasParaExibir;
  }
}
