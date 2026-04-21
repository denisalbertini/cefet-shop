<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class ProdutosController
{
    public function __construct(private ProdutosService $produtosService) {}

    public function listar(HttpRequest $req, HttpResponse $res): void
    {
        try {
            $body = (array) $req->body();

            $pagina = is_numeric($body['pagina']) ? (int) $body['pagina'] : 1;
            $limit = is_numeric($body['limit']) ? (int) $body['limit'] : 6;

            $produtos = $this->produtosService->listar($pagina, $limit);

            $res->json($produtos);
        } catch (Exception $e) {
            $this->tratarErro($e, $res);
        }
    }

    public function buscarPorId(HttpRequest $req, HttpResponse $res): void
    {
        try {
            $id = $req->param('id');

            if (!$id) {
                throw new ViewException(MensagemErro::PRODUTOS_CONTROLLER_ID);
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
            ViewException::class, DomainException::class => 400,
            RepositoryException::class => 404,
            PDOException::class => 500,
            default => 500,
        };

        $res->status($status)->send($e->getMessage());
    }
}
