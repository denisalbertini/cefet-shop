<?php declare(strict_types=1);

class UsuarioParaHidratar
{
  public string $id;
  public string $nome;
  public string $sobrenome;
  public string $matricula;
  public string $email;
  public string $senha;
  public string $papel;
  public int $saldo;
  public string|null $cursoId;
  public string|null $cursoNome;
  public string|null $disciplinaId;
  public string|null $disciplinaNome;
  public string|null $disciplinaCursadaId;
  public string|null $disciplinaCursadaPeriodo;
  public float|null $disciplinaCursadaMediaFinal;
}
