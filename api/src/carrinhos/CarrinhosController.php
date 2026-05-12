<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class CarrinhosController
{
  public function __construct(private CarrinhosService $carrinhosService) {}

  public function buscar(HttpRequest $req, HttpResponse $res): void
  {
    try {
      $carrinho = $this->carrinhosService->buscar();

      $res->json($carrinho);
    } catch (Exception $e) {
      $this->tratarErro($e, $res);
    }
  }

  public function buscarQuantidadeItens(
    HttpRequest $req,
    HttpResponse $res,
  ): void {
    try {
      $quantidade = $this->carrinhosService->buscarQuantidadeItens();

      $res->json(['quantidade' => $quantidade]);
    } catch (Exception $e) {
      $this->tratarErro($e, $res);
    }
  }

  public function adicionarItem(HttpRequest $req, HttpResponse $res): void
  {
    try {
      $body = (array) $req->body();

      $produtoId = $body['produtoId'] ?? null;
      $quantidade = $body['quantidade'] ?? null;

      if (!is_string($produtoId)) {
        throw new ControllerException(MensagemErro::PRODUTOS_CONTROLLER_ID);
      }

      if (!is_numeric($quantidade)) {
        throw new ControllerException(
          MensagemErro::CARRINHOS_CONTROLLER_QUANTIDADE,
        );
      } else {
        $quantidade = (int) $quantidade;
      }

      $quantidadeItensCarrinho = $this->carrinhosService->adicionarItem(
        $produtoId,
        $quantidade,
      );

      $res
        ->status(200)
        ->json(['quantidadeItensCarrinho' => $quantidadeItensCarrinho]);
    } catch (Exception $e) {
      $this->tratarErro($e, $res);
    }
  }

  public function alterarQuantidadeItem(
    HttpRequest $req,
    HttpResponse $res,
  ): void {
    try {
      $produtoId = $req->param('id');

      $body = (array) $req->body();

      $quantidade = $body['quantidade'] ?? null;

      if (!$produtoId) {
        throw new ControllerException(MensagemErro::PRODUTOS_CONTROLLER_ID);
      }

      if (!is_numeric($quantidade)) {
        throw new ControllerException(
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
    } catch (Exception $e) {
      $this->tratarErro($e, $res);
    }
  }

  public function removerItem(HttpRequest $req, HttpResponse $res): void
  {
    try {
      $produtoId = $req->param('id');

      if (!$produtoId) {
        throw new ControllerException(MensagemErro::PRODUTOS_CONTROLLER_ID);
      }

      $carrinho = $this->carrinhosService->removerItem($produtoId);

      $res->json($carrinho);
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
