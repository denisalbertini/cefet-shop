<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class ProdutosController
{
  public function __construct(private ProdutosService $produtosService) {}

  public function buscar(HttpRequest $req, HttpResponse $res): void
  {
    try {
      $queries = $req->queries();

      $paginaQuery = $queries['pagina'];
      $limitQuery = $queries['limit'];

      $pagina = is_numeric($paginaQuery) ? (int) $paginaQuery : 1;
      $limit = is_numeric($limitQuery) ? (int) $limitQuery : 6;

      $produtosPaginados = $this->produtosService->buscar($pagina, $limit);

      $res->json($produtosPaginados);
    } catch (Exception $e) {
      $this->tratarErro($e, $res);
    }
  }

  public function buscarPorId(HttpRequest $req, HttpResponse $res): void
  {
    try {
      $id = $req->param('id');

      if (!$id) {
        throw new ControllerException(MensagemErro::PRODUTOS_CONTROLLER_ID);
      }

      $produto = $this->produtosService->buscarPorId($id);

      $res->json($produto);
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
