<?php declare(strict_types=1);

class SessaoEmArquivo implements Sessao
{
    public function __construct()
    {
        $this->iniciar();
    }

    public function iniciar(): void
    {
        if (session_status() !== PHP_SESSION_ACTIVE) {
            session_name('sid');
            session_start();
        }
    }

    public function obter(string $chave): mixed
    {
        if (!isset($_SESSION[$chave])) {
            return null;
        }

        return $_SESSION[$chave];
    }

    public function salvar(string $chave, mixed $valor): void
    {
        $_SESSION[$chave] = $valor;
    }

    public function destruir(): void
    {
        session_destroy();
    }
}
