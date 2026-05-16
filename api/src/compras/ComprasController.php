<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class ComprasController
{
  public function __construct(private ComprasService $comprasService) {}

  public function registrar(HttpRequest $req, HttpResponse $res): void
  {
    try {
      $id = $this->comprasService->registrar();

      $res->json(['id' => $id]);
    } catch (HttpException $e) {
      $res->status($e->obterStatus())->json($e->obterErros());
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
