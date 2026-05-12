<?php declare(strict_types=1);

abstract class Usuario
{
  protected function __construct(
    public string $id,
    public string $nome,
    public string $sobrenome,
    public string $matricula,
    public string $email,
    public string $senha,
    public string $papel,
  ) {}

  public function obterNomeCompleto(): string
  {
    return "$this->nome $this->sobrenome";
  }
}
