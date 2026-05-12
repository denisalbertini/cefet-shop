<?php declare(strict_types=1);

class UsuarioParaExibir
{
  public readonly string $nome;
  public readonly string $papel;

  public function __construct(Usuario $usuario)
  {
    $this->nome = $usuario->nome;
    $this->papel = $usuario->papel;
  }
}
