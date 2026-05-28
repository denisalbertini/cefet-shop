<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class UsuarioLogadoMiddleware
{
  public function __construct(
    private Sessao $sessao,
    private UsuariosRepository $usuariosRepository,
  ) {}

  public function executar(
    HttpRequest $req,
    HttpResponse $res,
    bool &$stop,
  ): void {
    $usuarioId = $this->sessao->obter(ChaveSessao::USUARIO);

    $logado = is_string($usuarioId);

    if (!$logado) {
      $stop = true;

      $res->status(401)->json(['erros' => []]);

      return;
    }

    $usuario = $this->usuariosRepository->buscarPorId($usuarioId);

    $req->extra()->set('usuario', $usuario);
  }
}
