<?php declare(strict_types=1);

require_once './vendor/autoload.php';

use phputil\cors\CorsOptions;
use phputil\router\Router;
use function phputil\cors\cors;

$pdo = Database::obterInstancia()->obterPdoProd();

$sessao = new SessaoEmArquivo();

$produtosRepository = new ProdutosRepositoryBdr($pdo);
$carrinhosRepository = new CarrinhosRepositorySessao($sessao);
$usuariosRepository = new UsuariosRepositoryBdr($pdo);

$produtosService = new ProdutosService($produtosRepository);
$carrinhosService = new CarrinhosService(
  $carrinhosRepository,
  $produtosRepository,
);
$usuariosService = new UsuariosService($usuariosRepository, $sessao);

$produtosController = new ProdutosController($produtosService);
$carrinhosController = new CarrinhosController($carrinhosService);
$usuariosController = new UsuariosController($usuariosService);

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

$app->post('/usuarios/login', [$usuariosController, 'login']);
$app->get('/usuarios/logout', [$usuariosController, 'logout']);
$app->get('/usuarios', [$usuariosController, 'buscarUsuarioLogado']);

$app->delete('/sessao', function ($req, $res) {
  new SessaoEmArquivo()->destruir();
  $res->status(201)->json();
});

$app->listen();
