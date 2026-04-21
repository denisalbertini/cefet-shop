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

$app->get('/produtos', [$produtosController, 'listar']);
$app->get('/produtos/:id', [$produtosController, 'buscarPorId']);

$app->listen();
