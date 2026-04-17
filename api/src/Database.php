<?php declare(strict_types=1);

class Database
{
    private static Database $instancia;
    private PDO $pdoProd;
    private PDO $pdoTest;

    private function __construct()
    {
        try {
            $this->pdoProd = new Pdo('mysql:dbname=g7_prod;host=localhost;charset=utf8', 'root');
            $this->pdoTest = new Pdo('mysql:dbname=g7_test;host=localhost;charset=utf8', 'root');
        } catch (Exception $e) {
            http_response_code(500);
            die(MensagemErro::DATABASE_CONNECTION);
        }
    }

    public static function getInstancia()
    {
        if (!isset(self::$instancia)) {
            self::$instancia = new self();
        }

        return self::$instancia;
    }

    public function getPdoProd()
    {
        return $this->pdoProd;
    }

    public function getPdoTest()
    {
        return $this->pdoTest;
    }
}
