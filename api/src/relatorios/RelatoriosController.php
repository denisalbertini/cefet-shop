<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

class RelatoriosController
{
  public function __construct(private RelatoriosService $relatoriosService) {}

  public function buscarVendas(HttpRequest $req, HttpResponse $res): void
  {
    try {
      [$inicio, $fim] = $this->extrairPeriodo($req);

      $relatorio = $this->relatoriosService->buscarVendas($inicio, $fim);

      $res->json($relatorio);
    } catch (HttpException $e) {
      $res->status($e->obterStatus())->json($e->obterErros());
    } catch (Exception $e) {
      $this->tratarErro($e, $res);
    }
  }

  public function buscarTopItens(HttpRequest $req, HttpResponse $res): void
  {
    try {
      [$inicio, $fim] = $this->extrairPeriodo($req);

      $relatorio = $this->relatoriosService->buscarTopItens($inicio, $fim);

      $res->json($relatorio);
    } catch (HttpException $e) {
      $res->status($e->obterStatus())->json($e->obterErros());
    } catch (Exception $e) {
      $this->tratarErro($e, $res);
    }
  }

  /**
   * @return Data[]
   */
  private function extrairPeriodo(HttpRequest $req): array
  {
    $queries = $req->queries();

    $inicio = $queries['inicio'] ?? null;
    $fim = $queries['fim'] ?? null;

    if (!is_string($inicio) || !is_string($fim)) {
      throw new HttpException(400, MensagemErro::RELATORIOS_CONTROLLER_PERIODO);
    }

    $timestampInicio = strtotime($inicio);
    $timestampFim = strtotime($fim . ' 23:59:59');

    if ($timestampInicio === false || $timestampFim === false) {
      throw new HttpException(400, MensagemErro::RELATORIOS_CONTROLLER_PERIODO);
    }

    return [new Data($timestampInicio), new Data($timestampFim)];
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
