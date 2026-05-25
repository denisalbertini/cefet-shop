<?php declare(strict_types=1);

class UnidadeTransacionalPdo implements UnidadeTransacional
{
  public function __construct(private PDO $pdo) {}

  public function iniciar(): void
  {
    if ($this->pdo->inTransaction()) {
      throw new LogicException(
        MensagemErro::UNIDADE_TRANSACIONAL_TRANSACAO_EM_ANDAMENTO,
      );
    }

    $this->pdo->beginTransaction();
  }

  public function confirmar(): void
  {
    if (!$this->pdo->inTransaction()) {
      throw new LogicException(
        MensagemErro::UNIDADE_TRANSACIONAL_TRANSACAO_INEXISTENTE,
      );
    }

    $this->pdo->commit();
  }

  public function reverter(): void
  {
    if (!$this->pdo->inTransaction()) {
      throw new LogicException(
        MensagemErro::UNIDADE_TRANSACIONAL_TRANSACAO_INEXISTENTE,
      );
    }

    $this->pdo->rollBack();
  }
}
