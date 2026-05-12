<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class UsuariosController
{
  public function __construct(private UsuariosService $usuariosService) {}

  public function login(HttpRequest $req, HttpResponse $res): void
  {
    try {
      $body = (array) $req->body();

      $identificador = $body['identificador'] ?? null;
      $senha = $body['senha'] ?? null;

      if (!is_string($identificador) || !is_string($senha)) {
        throw new ControllerException(MensagemErro::USUARIOS_CONTROLLER_LOGIN);
      }

      $this->usuariosService->login($identificador, $senha);

      $res->status(204)->send(null);
    } catch (Exception $e) {
      $this->tratarErro($e, $res);
    }
  }

  public function logout(HttpRequest $req, HttpResponse $res): void
  {
    try {
      $this->usuariosService->logout();

      $res->status(204)->send(null);
    } catch (Exception $e) {
      $this->tratarErro($e, $res);
    }
  }

  public function buscarUsuarioLogado(HttpRequest $req, HttpResponse $res): void
  {
    try {
      $usuario = $this->usuariosService->buscarUsuarioLogado();

      $res->json($usuario);
    } catch (Exception $e) {
      $this->tratarErro($e, $res);
    }
  }

  private function tratarErro(Exception $e, HttpResponse $res): void
  {
    $status = match ($e::class) {
      DomainException::class, ControllerException::class => 400,
      RepositoryException::class => $e->getCode(),
      PDOException::class => 500,
      default => 500,
    };

    $res->status($status)->send($e->getMessage());
  }
}
