<?php declare(strict_types=1);

class Paginacao
{
  private int $pagina;
  private int $limit;

  public function __construct(int $pagina, int $limit)
  {
    $this->validarDados($pagina, $limit);

    $this->pagina = $pagina;
    $this->limit = $limit;
  }

  public function obterPagina(): int
  {
    return $this->pagina;
  }
  public function obterLimit(): int
  {
    return $this->limit;
  }

  public function obterOffset(): int
  {
    return ($this->pagina - 1) * $this->limit;
  }

  private function validarDados(int $pagina, int $limit): void
  {
    $erros = [];

    if ($pagina <= 0) {
      array_push($erros, MensagemErro::PAGINACAO_PAGINA);
    }

    if ($limit <= 0) {
      array_push($erros, MensagemErro::PAGINACAO_LIMIT);
    }

    if (sizeof($erros) > 0) {
      throw new DomainException(
        FormatadorMensagem::formatarMensagemErro($erros),
      );
    }
  }
}
