<?php declare(strict_types=1);

require_once './vendor/autoload.php';

use phputil\router\Router;
use function phputil\cors\cors;

$pdo = Database::getInstancia()->getPdoProd();

$produtosRepository = new ProdutosRepositoryBdr($pdo);
$produtosService = new ProdutosService($produtosRepository);
$produtosController = new ProdutosController($produtosService);

$app = new Router();

$app->use(cors());

$app->get('/produtos', function ($req, $res) use ($produtosController) {
    $produtosController->getView()->buscar($req, $res);
});
$app->get('/produtos/:id', function ($req, $res) use ($produtosController) {
    $produtosController->getView()->buscarPorId($req, $res);
});

$app->listen();
