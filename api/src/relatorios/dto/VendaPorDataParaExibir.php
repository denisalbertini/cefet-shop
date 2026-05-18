<?php declare(strict_types=1);

class VendaPorDataParaExibir
{
  public string $data;
  public string $total;

  public function __construct(string $data, int $totalCentavos)
  {
    $this->data = $data;
    $this->total = new Cefetin($totalCentavos)->obterValorFormatado();
  }
}
