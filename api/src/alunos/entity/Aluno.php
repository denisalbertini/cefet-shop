<?php declare(strict_types=1);

class Aluno extends UsuarioComprador
{
  /**
   * @var DisciplinaCursada[]
   */
  public array $historico;

  /**
   * @param DisciplinaCursada[] $historico
   */
  public function __construct(
    string $id,
    string $nome,
    string $sobrenome,
    string $matricula,
    string $email,
    string $senha,
    string $papel,
    Cefetin $saldo,
    array $historico,
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

    $this->historico = $historico;
  }
}
