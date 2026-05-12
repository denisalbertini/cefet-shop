<?php declare(strict_types=1);

describe('UsuariosRepositoryBdr', function () {
  beforeAll(function () {
    $pdo = Database::obterInstancia()->obterPdoTest();

    $sql = file_get_contents(__DIR__ . '/../sql/dados_test_usuarios.sql');

    $pdo->exec($sql);

    $this->repository = new UsuariosRepositoryBdr($pdo);
  });

  describe('buscarPorMatriculaOuEmail', function () {
    it('deveria retornar um gestor por matrícula', function () {
      $usuario = $this->repository->buscarPorMatriculaOuEmail('1111111GSIS');

      expect($usuario)->toBeAnInstanceOf(Gestor::class);
      expect($usuario->id)->toBe('7e7a7a26-8e57-4ea9-b21b-36c11b1ca4a8');
      expect($usuario->nome)->toBe('Gestor');
      expect($usuario->sobrenome)->toBe('do Cefet');
      expect($usuario->matricula)->toBe('1111111GSIS');
      expect($usuario->email)->toBe('gestor@cefet-rj.br');
      expect($usuario->senha)->toBe('gestor');
      expect($usuario->papel)->toBe('gestor');
    });

    it('deveria retornar um gestor por email', function () {
      $usuario = $this->repository->buscarPorMatriculaOuEmail(
        'gestor@cefet-rj.br',
      );

      expect($usuario)->toBeAnInstanceOf(Gestor::class);
      expect($usuario->id)->toBe('7e7a7a26-8e57-4ea9-b21b-36c11b1ca4a8');
      expect($usuario->nome)->toBe('Gestor');
      expect($usuario->sobrenome)->toBe('do Cefet');
      expect($usuario->matricula)->toBe('1111111GSIS');
      expect($usuario->email)->toBe('gestor@cefet-rj.br');
      expect($usuario->senha)->toBe('gestor');
      expect($usuario->papel)->toBe('gestor');
    });

    it('deveria retornar um funcionário por matrícula', function () {
      $usuario = $this->repository->buscarPorMatriculaOuEmail('2222222GSIS');

      expect($usuario)->toBeAnInstanceOf(Funcionario::class);
      expect($usuario->id)->toBe('00f614f0-b866-4406-b1f3-15fd32a04384');
      expect($usuario->nome)->toBe('Funcionário');
      expect($usuario->sobrenome)->toBe('do Cefet');
      expect($usuario->matricula)->toBe('2222222GSIS');
      expect($usuario->email)->toBe('funcionario@cefet-rj.br');
      expect($usuario->senha)->toBe('funcionario');
      expect($usuario->papel)->toBe('funcionario');
      expect($usuario->saldo->valorCentavos)->toBe(100000);
    });

    it('deveria retornar um funcionário por email', function () {
      $usuario = $this->repository->buscarPorMatriculaOuEmail(
        'funcionario@cefet-rj.br',
      );

      expect($usuario)->toBeAnInstanceOf(Funcionario::class);
      expect($usuario->id)->toBe('00f614f0-b866-4406-b1f3-15fd32a04384');
      expect($usuario->nome)->toBe('Funcionário');
      expect($usuario->sobrenome)->toBe('do Cefet');
      expect($usuario->matricula)->toBe('2222222GSIS');
      expect($usuario->email)->toBe('funcionario@cefet-rj.br');
      expect($usuario->senha)->toBe('funcionario');
      expect($usuario->papel)->toBe('funcionario');
      expect($usuario->saldo->valorCentavos)->toBe(100000);
    });

    it('deveria retornar um aluno por matrícula', function () {
      $usuario = $this->repository->buscarPorMatriculaOuEmail('3333333GSIS');

      $disciplinaCursada = $usuario->historico[0];
      $disciplina = $disciplinaCursada->disciplina;
      $curso = $disciplina->curso;

      expect($usuario)->toBeAnInstanceOf(Aluno::class);
      expect($usuario->id)->toBe('d4314882-012b-4b84-9626-4208f4ed8264');
      expect($usuario->nome)->toBe('Aluno');
      expect($usuario->sobrenome)->toBe('do Cefet');
      expect($usuario->matricula)->toBe('3333333GSIS');
      expect($usuario->email)->toBe('aluno@cefet-rj.br');
      expect($usuario->senha)->toBe('aluno');
      expect($usuario->papel)->toBe('aluno');
      expect($usuario->saldo->valorCentavos)->toBe(100000);
      expect($disciplinaCursada->id)->toBe(
        '914b57a3-1a1a-4895-9e56-e5cc95cb8d76',
      );
      expect($disciplinaCursada->mediaFinal)->toBe(10.0);
      expect($disciplinaCursada->periodo->obterValorFormatado())->toBe(
        '2026-1',
      );
      expect($disciplina->id)->toBe('6dd10dd1-78a1-4674-a1ad-1f6c3ee11849');
      expect($disciplina->nome)->toBe('Projeto Integrador de Sistemas');
      expect($curso->id)->toBe('97f83e00-3c3b-4e68-be33-3e66e42af808');
      expect($curso->nome)->toBe('Sistemas de Informação');
    });

    it('deveria retornar um aluno por email', function () {
      $usuario = $this->repository->buscarPorMatriculaOuEmail(
        'aluno@cefet-rj.br',
      );

      $disciplinaCursada = $usuario->historico[0];
      $disciplina = $disciplinaCursada->disciplina;
      $curso = $disciplina->curso;

      expect($usuario)->toBeAnInstanceOf(Aluno::class);
      expect($usuario->id)->toBe('d4314882-012b-4b84-9626-4208f4ed8264');
      expect($usuario->nome)->toBe('Aluno');
      expect($usuario->sobrenome)->toBe('do Cefet');
      expect($usuario->matricula)->toBe('3333333GSIS');
      expect($usuario->email)->toBe('aluno@cefet-rj.br');
      expect($usuario->senha)->toBe('aluno');
      expect($usuario->papel)->toBe('aluno');
      expect($usuario->saldo->valorCentavos)->toBe(100000);
      expect($disciplinaCursada->id)->toBe(
        '914b57a3-1a1a-4895-9e56-e5cc95cb8d76',
      );
      expect($disciplinaCursada->mediaFinal)->toBe(10.0);
      expect($disciplinaCursada->periodo->obterValorFormatado())->toBe(
        '2026-1',
      );
      expect($disciplina->id)->toBe('6dd10dd1-78a1-4674-a1ad-1f6c3ee11849');
      expect($disciplina->nome)->toBe('Projeto Integrador de Sistemas');
      expect($curso->id)->toBe('97f83e00-3c3b-4e68-be33-3e66e42af808');
      expect($curso->nome)->toBe('Sistemas de Informação');
    });
  });
});
