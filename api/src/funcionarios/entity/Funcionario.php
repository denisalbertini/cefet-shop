<?php declare(strict_types=1);

class Funcionario extends UsuarioComprador
{
  public function __construct(
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
      $saldo,
    );
  }
}
