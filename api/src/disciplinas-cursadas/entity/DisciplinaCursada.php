<?php declare(strict_types=1);

class DisciplinaCursada
{
  public function __construct(
    public string $id,
    public float $mediaFinal,
    public Periodo $periodo,
    public Disciplina $disciplina,
  ) {}
}
