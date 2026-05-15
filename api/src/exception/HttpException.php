<?php declare(strict_types=1);

class HttpException extends RuntimeException
{
  private int $status;
  /**
   * @var string[]
   */
  private array $erros;

  public function __construct(int $status, string ...$erros)
  {
    parent::__construct();

    $this->status = $status;
    $this->erros = $erros;
  }

  public function obterStatus(): int
  {
    return $this->status;
  }

  /**
   * @return string[]
   */
  public function obterErros(): array
  {
    return $this->erros;
  }
}
