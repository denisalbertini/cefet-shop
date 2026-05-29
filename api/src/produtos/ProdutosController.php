<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class ProdutosController
{
  public function __construct(private ProdutosService $produtosService) {}

  public function buscar(HttpRequest $req, HttpResponse $res): void
  {
    $queries = $req->queries();

    $paginaQuery = $queries['pagina'];
    $limitQuery = $queries['limit'];

    $pagina = is_numeric($paginaQuery) ? (int) $paginaQuery : 1;
    $limit = is_numeric($limitQuery) ? (int) $limitQuery : 6;

    $produtosPaginados = $this->produtosService->buscar($pagina, $limit);

    $res->json($produtosPaginados);
  }

  public function buscarPorId(HttpRequest $req, HttpResponse $res): void
  {
    $id = $req->param('id');

    if (!$id) {
      throw new HttpException(400, MensagemErro::PRODUTOS_CONTROLLER_ID);
    }

    $produto = $this->produtosService->buscarPorId($id);

    $res->json($produto);
  }
}
