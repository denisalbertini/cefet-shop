<?php declare(strict_types=1);

abstract class UsuarioComprador extends Usuario
{
  public Cefetin $saldo;

  protected function __construct(
    string $id,
    string $nome,
    string $sobrenome,
    string $matricula,
    string $email,
    string $senha,
    string $papel,
    Cefetin $saldo,
  ) {
    parent::__construct(
      $id,
      $nome,
      $sobrenome,
      $matricula,
      $email,
      $senha,
      $papel,
    );

    $this->saldo = $saldo;
  }

  public function creditar(Cefetin $quantia): void
  {
    $this->saldo->somar($quantia);
  }

  public function debitar(Cefetin $quantia): void
  {
    $this->saldo->subtrair($quantia);
  }
}
