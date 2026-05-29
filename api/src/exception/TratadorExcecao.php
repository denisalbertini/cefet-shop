<?php declare(strict_types=1);

use phputil\router\HttpRequest;
use phputil\router\HttpResponse;

abstract class TratadorExcecao
{
  public static function executar(callable $metodo): callable
  {
    return function (HttpRequest $req, HttpResponse $res) use ($metodo) {
      try {
        $metodo($req, $res);
      } catch (Exception $e) {
        if (!($e instanceof HttpException)) {
          error_log($e->getMessage());

          $e = new HttpException(500, ...explode(PHP_EOL, $e->getMessage()));
        }

        $resBody = ['erros' => $e->obterErros()];

        $res->status($e->obterStatus())->json($resBody);
      }
    };
  }
}
