<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class FuncionarioMiddleware
{
  public function executar(
    HttpRequest $req,
    HttpResponse $res,
    bool &$stop,
  ): void {
    $usuario = $req->extra()->get('usuario');

    if (!($usuario instanceof Usuario)) {
      $stop = true;

      $res->status(500)->send(null);

      die(
        'O middleware de filtro de papel deve ser utilizado em conjunto com o middleware de usuário logado.'
      );
    }

    if ($usuario->papel === Papel::FUNCIONARIO) {
      return;
    }

    $stop = true;

    $res->status(403)->json(['erros' => []]);
  }
}
