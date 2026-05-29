<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class ComprasController
{
  public function __construct(private ComprasService $comprasService) {}

  public function registrar(HttpRequest $req, HttpResponse $res): void
  {
    $id = $this->comprasService->registrar();

    $res->json(['id' => $id]);
  }

  public function buscarPorId(HttpRequest $req, HttpResponse $res): void
  {
    $id = $req->param('id');

    if (!is_string($id)) {
      throw new HttpException(400, MensagemErro::COMPRAS_CONTROLLER_ID);
    }

    $compra = $this->comprasService->buscarPorId($id);

    $res->json($compra);
  }

  public function buscar(HttpRequest $req, HttpResponse $res): void
  {
    $compras = $this->comprasService->buscarPorUsuario();

    $res->json($compras);
  }
}
