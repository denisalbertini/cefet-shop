<?php declare(strict_types=1);

class TransacaoRepositoryEmPDO implements TransacaoRepository
{
  public function __construct(private PDO $pdo) {}

  public function iniciar(): void
  {
    $this->pdo->beginTransaction();
  }

  public function confirmar(): void
  {
    $this->pdo->commit();
  }

  public function reverter(): void
  {
    $this->pdo->rollBack();
  }
}