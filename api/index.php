<?php declare(strict_types=1);

require_once './vendor/autoload.php';

use phputil\cors\CorsOptions;
use phputil\router\Router;
use function phputil\cors\cors;

$pdo = Database::getInstancia()->getPdoProd();

$produtosRepository = new ProdutosRepositoryBdr($pdo);
$produtosService = new ProdutosService($produtosRepository);
$produtosController = new ProdutosController($produtosService);

$carrinhosRepository = new CarrinhosRepositorySessao();
$carrinhosService = new CarrinhosService(
    $carrinhosRepository,
    $produtosRepository,
);
$carrinhosController = new CarrinhosController($carrinhosService);

$app = new Router();

$corsOptions = new CorsOptions()->withAllowedHeaders(['Content-Type']);

$app->use(cors($corsOptions));

$app->get('/produtos', [$produtosController, 'listar']);
$app->get('/produtos/:id', [$produtosController, 'buscarPorId']);

$app->get('/carrinhos', [$carrinhosController, 'buscar']);
$app->get('/carrinhos/itens/quantidade', [
    $carrinhosController,
    'buscarQuantidadeItens',
]);
$app->post('/carrinhos/itens', [$carrinhosController, 'adicionarItem']);
$app->patch('/carrinhos/itens/:id', [
    $carrinhosController,
    'alterarQuantidadeItem',
]);
$app->delete('/carrinhos/itens/:id', [$carrinhosController, 'removerItem']);

$app->delete('/sessao', function ($req, $res) {
    new SessaoEmArquivo()->destruir();
    $res->status(201)->json();
});

$app->listen();
