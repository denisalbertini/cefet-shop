<?php declare(strict_types=1);

require_once './vendor/autoload.php';

use phputil\router\Router;
use function phputil\cors\cors;

$pdo = Database::getInstancia()->getPdoProd();

$produtosRepository = new ProdutosRepositoryBdr($pdo);
$produtosService = new ProdutosService($produtosRepository);
$produtosController = new ProdutosController($produtosService);

$carrinhosRepository = new CarrinhosRepositorySessao();
$carrinhosService = new CarrinhosService($carrinhosRepository, $produtosRepository);
$carrinhosController = new CarrinhosController($carrinhosService);

$app = new Router();

$app->use(cors());

$app->get('/produtos', [$produtosController, 'listar']);
$app->get('/produtos/:id', [$produtosController, 'buscarPorId']);

$app->get('/carrinhos', [$carrinhosController, 'buscar']);
$app->post('carrinhos/itens', [$carrinhosController, 'adicionarItem']);
$app->patch('carrinhos/itens/:id', [$carrinhosController, 'alterarQuantidadeItem']);
$app->delete('carrinhos/itens/:id', [$carrinhosController, 'removerItem']);

$app->delete('/sessao', function ($req, $res) {
    session_destroy();
    $res->status(201);
});

$app->listen();
