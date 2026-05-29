<?php declare(strict_types=1);

require_once './vendor/autoload.php';

use phputil\cors\CorsOptions;
use phputil\router\Router;
use function phputil\cors\cors;

date_default_timezone_set('America/Sao_Paulo');

$containerInstancias = ContainerInstancias::obterInstancia();

$produtosController = $containerInstancias->obterProdutosController();
$carrinhosController = $containerInstancias->obterCarrinhosController();
$usuariosController = $containerInstancias->obterUsuariosController();
$comprasController = $containerInstancias->obterComprasController();
$relatoriosController = $containerInstancias->obterRelatoriosController();

$usuarioLogadoMiddleware = $containerInstancias->obterUsuarioLogadoMiddleware();
$funcionarioMiddleware = $containerInstancias->obterFuncionarioMiddleware();

$app = new Router();

$corsOptions = new CorsOptions()->withAllowedHeaders(['Content-Type']);

$app->use(cors($corsOptions));

$app
  ->route('/produtos')
  ->get('/', TratadorExcecao::executar([$produtosController, 'buscar']))
  ->get('/:id', TratadorExcecao::executar([$produtosController, 'buscarPorId']))
  ->end();

$app
  ->route('/carrinhos')
  ->get('/', TratadorExcecao::executar([$carrinhosController, 'buscar']))
  ->get(
    '/itens/quantidade',
    TratadorExcecao::executar([$carrinhosController, 'buscarQuantidadeItens']),
  )
  ->post(
    '/itens',
    TratadorExcecao::executar([$carrinhosController, 'adicionarItem']),
  )
  ->patch(
    '/itens/:id',
    TratadorExcecao::executar([$carrinhosController, 'alterarQuantidadeItem']),
  )
  ->delete(
    '/itens/:id',
    TratadorExcecao::executar([$carrinhosController, 'removerItem']),
  )
  ->end();

$app
  ->route('/usuarios')
  ->post('/login', TratadorExcecao::executar([$usuariosController, 'login']))
  ->get('/logout', TratadorExcecao::executar([$usuariosController, 'logout']))
  ->get(
    '/',
    TratadorExcecao::executar([$usuariosController, 'buscarUsuarioLogado']),
  )
  ->end();

$app
  ->route('/compras')
  ->get('/:id', TratadorExcecao::executar([$comprasController, 'buscarPorId']))
  ->post('/', TratadorExcecao::executar([$comprasController, 'registrar']))
  ->get('/', TratadorExcecao::executar([$comprasController, 'buscar']))
  ->end();

$app
  ->route('/relatorios')
  ->use([$usuarioLogadoMiddleware, 'executar'])
  ->use([$funcionarioMiddleware, 'executar'])
  ->get(
    '/vendas',
    TratadorExcecao::executar([$relatoriosController, 'buscarVendas']),
  )
  ->get(
    '/top-itens',
    TratadorExcecao::executar([$relatoriosController, 'buscarTopItens']),
  )
  ->end();

$app->listen();
