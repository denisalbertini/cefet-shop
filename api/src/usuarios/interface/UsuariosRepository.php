<?php declare(strict_types=1);

interface UsuariosRepository
{
  public function buscarPorMatriculaOuEmail(string $identificador): Usuario;
  public function buscarPorId(string $id): Usuario;
  public function subtrairSaldo(Usuario $usuario, int $valor): void;
}
