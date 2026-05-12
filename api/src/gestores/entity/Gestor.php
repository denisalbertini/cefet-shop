<?php declare(strict_types=1);

class Gestor extends Usuario
{
  public function __construct(
    string $id,
    string $nome,
    string $sobrenome,
    string $matricula,
    string $email,
    string $senha,
    string $papel,
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
  }
}
