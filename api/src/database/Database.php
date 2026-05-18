<?php declare(strict_types=1);

class Database
{
  private static Database $instancia;
  private PDO $pdoProd;
  private PDO $pdoTest;

  private function __construct()
  {
    try {
      $this->pdoProd = new Pdo(
        'mysql:dbname=g7_prod;host=localhost;charset=utf8',
        'root',
        'root',
      );
      $this->pdoTest = new Pdo(
        'mysql:dbname=g7_test;host=localhost;charset=utf8',
        'root',
        'root',
      );
    } catch (Exception $e) {
      http_response_code(500);
      die(MensagemErro::DATABASE_CONNECTION . $e->getMessage());
    }
  }

  public static function obterInstancia(): self
  {
    if (!isset(self::$instancia)) {
      self::$instancia = new self();
    }

    return self::$instancia;
  }

  public function obterPdoProd(): PDO
  {
    return $this->pdoProd;
  }

  public function obterPdoTest(): PDO
  {
    return $this->pdoTest;
  }
}
