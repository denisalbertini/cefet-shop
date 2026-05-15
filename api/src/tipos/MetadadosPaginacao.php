<?php declare(strict_types=1);

class MetadadosPaginacao
{
  public readonly int $paginaAtual;
  public readonly int $totalPaginas;
  public readonly bool $temProx;
  public readonly bool $temAnt;

  public function __construct(int $paginaAtual, int $totalRegistros, int $limit)
  {
    $this->paginaAtual = $paginaAtual;
    $this->totalPaginas = $this->calcularTotalPaginas($totalRegistros, $limit);
    $this->temProx = $this->definirTemProx();
    $this->temAnt = $this->definirTemAnt();
  }

  private function calcularTotalPaginas(int $totalRegitsros, int $limit): int
  {
    return (int) ceil($totalRegitsros / $limit);
  }

  private function definirTemProx(): bool
  {
    return $this->paginaAtual < $this->totalPaginas;
  }

  private function definirTemAnt(): bool
  {
    return $this->paginaAtual > 1;
  }
}
