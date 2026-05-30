<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class CarrinhosController
{
  public function __construct(private CarrinhosService $carrinhosService) {}

  public function buscar(HttpRequest $req, HttpResponse $res): void
  {
    $carrinho = $this->carrinhosService->buscar();

    $res->json($carrinho);
  }

  public function buscarQuantidadeItens(
    HttpRequest $req,
    HttpResponse $res,
  ): void {
    $quantidade = $this->carrinhosService->buscarQuantidadeItens();

    $res->json(['quantidade' => $quantidade]);
  }

  public function adicionarItem(HttpRequest $req, HttpResponse $res): void
  {
    $body = (array) $req->body();

    $produtoId = $body['produtoId'] ?? null;
    $quantidade = $body['quantidade'] ?? null;

    if (!is_string($produtoId)) {
      throw new HttpException(400, MensagemErro::PRODUTOS_CONTROLLER_ID);
    }

    if (!is_numeric($quantidade)) {
      throw new HttpException(
        400,
        MensagemErro::CARRINHOS_CONTROLLER_QUANTIDADE,
      );
    } else {
      $quantidade = (int) $quantidade;
    }

    $this->carrinhosService->adicionarItem($produtoId, $quantidade);

    $res->status(204)->send(null);
  }

  public function alterarQuantidadeItem(
    HttpRequest $req,
    HttpResponse $res,
  ): void {
    $produtoId = $req->param('id');

    $body = (array) $req->body();

    $quantidade = $body['quantidade'] ?? null;

    if (!$produtoId) {
      throw new HttpException(400, MensagemErro::PRODUTOS_CONTROLLER_ID);
    }

    if (!is_numeric($quantidade)) {
      throw new HttpException(
        400,
        MensagemErro::CARRINHOS_CONTROLLER_QUANTIDADE,
      );
    } else {
      $quantidade = (int) $quantidade;
    }

    $carrinho = $this->carrinhosService->alterarQuantidadeItem(
      $produtoId,
      $quantidade,
    );

    $res->json($carrinho);
  }

  public function removerItem(HttpRequest $req, HttpResponse $res): void
  {
    $produtoId = $req->param('id');

    if (!$produtoId) {
      throw new HttpException(400, MensagemErro::PRODUTOS_CONTROLLER_ID);
    }

    $carrinho = $this->carrinhosService->removerItem($produtoId);

    $res->json($carrinho);
  }
}
