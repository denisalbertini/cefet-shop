<?php declare(strict_types=1);

class UsuariosRepositoryBdr implements UsuariosRepository
{
  public function __construct(private PDO $pdo) {}

  public function buscarPorMatriculaOuEmail(string $identificador): Usuario
  {
    $ps = $this->pdo->prepare(
      'SELECT * FROM usuario_para_hidratar WHERE matricula = ? OR email = ?',
    );

    $ps->execute([$identificador, $identificador]);

    /**
     * @var UsuarioParaHidratar[]
     */
    $linhas = $ps->fetchAll(PDO::FETCH_CLASS, UsuarioParaHidratar::class);

    if (empty($linhas)) {
      throw new HttpException(404, MensagemErro::USUARIOS_REPOSITORY_NOT_FOUND);
    }

    return $this->hidratar($linhas);
  }

  public function buscarPorId(string $id): Usuario
  {
    $ps = $this->pdo->prepare(
      'SELECT * FROM usuario_para_hidratar WHERE id = ?',
    );

    $ps->execute([$id]);

    /**
     * @var UsuarioParaHidratar[]
     */
    $linhas = $ps->fetchAll(PDO::FETCH_CLASS, UsuarioParaHidratar::class);

    if (empty($linhas)) {
      throw new HttpException(404, MensagemErro::USUARIOS_REPOSITORY_NOT_FOUND);
    }

    return $this->hidratar($linhas);
  }

  public function subtrairSaldo(Usuario $usuario, int $valor): void
  {
    $ps = $this->pdo->prepare(
      'UPDATE usuario SET saldo = saldo - ? WHERE id = ?',
    );

    $ps->execute([$valor, $usuario->id]);
  }

  /**
   * @param UsuarioParaHidratar[] $linhas
   */
  private function hidratar(array $linhas): Usuario
  {
    $primeiraLinha = $linhas[0];

    $id = $primeiraLinha->id;
    $nome = $primeiraLinha->nome;
    $sobrenome = $primeiraLinha->sobrenome;
    $matricula = $primeiraLinha->matricula;
    $email = $primeiraLinha->email;
    $senha = $primeiraLinha->senha;
    $papel = $primeiraLinha->papel;
    $saldo = $primeiraLinha->saldo;

    $saldoCefetin = new Cefetin($saldo);

    if ($papel === Papel::FUNCIONARIO) {
      return new Funcionario(
        $id,
        $nome,
        $sobrenome,
        $matricula,
        $email,
        $senha,
        $papel,
        $saldoCefetin,
      );
    }

    $aluno = new Aluno(
      $id,
      $nome,
      $sobrenome,
      $matricula,
      $email,
      $senha,
      $papel,
      $saldoCefetin,
      [],
    );

    foreach ($linhas as $l) {
      $disciplinaCursadaId = $l->disciplinaCursadaId;

      if (!$disciplinaCursadaId) {
        continue;
      }

      $cursoId = $l->cursoId;
      $cursoNome = $l->cursoNome;
      $disciplinaId = $l->disciplinaId;
      $disciplinaNome = $l->disciplinaNome;
      $periodo = $l->disciplinaCursadaPeriodo;
      $mediaFinal = $l->disciplinaCursadaMediaFinal;

      if (
        !$cursoId ||
        !$cursoNome ||
        !$disciplinaId ||
        !$disciplinaNome ||
        !$periodo ||
        !$mediaFinal
      ) {
        throw new HttpException(500, MensagemErro::REPOSITORY_UNEXPECTED);
      }

      $curso = new Curso($cursoId, $cursoNome);

      $disciplina = new Disciplina($disciplinaId, $disciplinaNome, $curso);

      $periodo = Periodo::instanciarComString($periodo);

      $disciplinaCursada = new DisciplinaCursada(
        $disciplinaCursadaId,
        $mediaFinal,
        $periodo,
        $disciplina,
      );

      array_push($aluno->historico, $disciplinaCursada);
    }

    return $aluno;
  }
}
