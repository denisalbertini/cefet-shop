<?php declare(strict_types=1);

require_once './vendor/autoload.php';

use phputil\cors\CorsOptions;
use phputil\router\Router;
use function phputil\cors\cors;

date_default_timezone_set('America/Sao_Paulo');

$pdo = Database::obterInstancia()->obterPdoProd();

$sessao = new SessaoEmArquivo();

$produtosRepository = new ProdutosRepositoryBdr($pdo);
$carrinhosRepository = new CarrinhosRepositorySessao($sessao);
$usuariosRepository = new UsuariosRepositoryBdr($pdo);
$itensRepository = new ItensCompraRepositoryBdr($pdo, $produtosRepository);
$comprasRepository = new ComprasRepositoryBdr($pdo, $usuariosRepository);
$relatoriosRepository = new RelatoriosRepositoryBdr($pdo);

$transacao = new UnidadeTransacionalPdo($pdo);

$produtosService = new ProdutosService($produtosRepository);
$carrinhosService = new CarrinhosService(
  $carrinhosRepository,
  $produtosRepository,
);
$usuariosService = new UsuariosService($usuariosRepository, $sessao);
$comprasService = new ComprasService(
  $sessao,
  $usuariosRepository,
  $carrinhosRepository,
  $itensRepository,
  $produtosRepository,
  $comprasRepository,
  $transacao,
);
$relatoriosService = new RelatoriosService($relatoriosRepository);

$produtosController = new ProdutosController($produtosService);
$carrinhosController = new CarrinhosController($carrinhosService);
$usuariosController = new UsuariosController($usuariosService);
$comprasController = new ComprasController($comprasService);
$relatoriosController = new RelatoriosController($relatoriosService);

$usuarioLogadoMiddleware = new UsuarioLogadoMiddleware(
  $sessao,
  $usuariosRepository,
);
$funcionarioMiddleware = new FuncionarioMiddleware();

$app = new Router();

$corsOptions = new CorsOptions()->withAllowedHeaders(['Content-Type']);

$app->use(cors($corsOptions));

$app
  ->route('/produtos')
  ->get('/', [$produtosController, 'buscar'])
  ->get('/:id', [$produtosController, 'buscarPorId'])
  ->end();

$app
  ->route('/carrinhos')
  ->get('/', [$carrinhosController, 'buscar'])
  ->get('/itens/quantidade', [$carrinhosController, 'buscarQuantidadeItens'])
  ->post('/itens', [$carrinhosController, 'adicionarItem'])
  ->patch('/itens/:id', [$carrinhosController, 'alterarQuantidadeItem'])
  ->delete('/itens/:id', [$carrinhosController, 'removerItem'])
  ->end();

$app
  ->route('/usuarios')
  ->post('/login', [$usuariosController, 'login'])
  ->get('/logout', [$usuariosController, 'logout'])
  ->get('/', [$usuariosController, 'buscarUsuarioLogado'])
  ->end();

$app
  ->route('/compras')
  ->get('/:id', [$comprasController, 'buscarPorId'])
  ->post('/', [$comprasController, 'registrar'])
  ->get('/', [$comprasController, 'buscar'])
  ->end();

$app
  ->route('/relatorios')
  ->use([$usuarioLogadoMiddleware, 'executar'])
  ->use([$funcionarioMiddleware, 'executar'])
  ->get('/vendas', [$relatoriosController, 'buscarVendas'])
  ->get('/top-itens', [$relatoriosController, 'buscarTopItens'])
  ->end();

$app->delete('/sessao', function ($req, $res) use ($sessao) {
  $sessao->destruir();
  $res->status(204)->send(null);
});

$app->listen();
