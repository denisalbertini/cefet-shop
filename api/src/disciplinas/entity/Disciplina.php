<?php declare(strict_types=1);

class Disciplina
{
  public function __construct(
    public string $id,
    public string $nome,
    public Curso $curso,
  ) {}
}
