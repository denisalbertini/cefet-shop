<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class UsuariosController
{
  public function __construct(private UsuariosService $usuariosService) {}

  public function login(HttpRequest $req, HttpResponse $res): void
  {
    $body = (array) $req->body();

    $identificador = $body['identificador'] ?? null;
    $senha = $body['senha'] ?? null;

    if (!is_string($identificador) || !is_string($senha)) {
      throw new HttpException(400, MensagemErro::USUARIOS_CONTROLLER_LOGIN);
    }

    $this->usuariosService->login($identificador, $senha);

    $res->status(204)->send(null);
  }

  public function logout(HttpRequest $req, HttpResponse $res): void
  {
    $this->usuariosService->logout();

    $res->status(204)->send(null);
  }

  public function buscarUsuarioLogado(HttpRequest $req, HttpResponse $res): void
  {
    $usuario = $this->usuariosService->buscarUsuarioLogado();

    $res->json($usuario);
  }
}
