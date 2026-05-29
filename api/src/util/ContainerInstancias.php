<?php declare(strict_types=1);

class ContainerInstancias
{
  private static self $instancia;

  private PDO $pdo;
  private Sessao $sessao;
  private UnidadeTransacional $transacao;

  private ProdutosRepository $produtosRepository;
  private CarrinhosRepository $carrinhosRepository;
  private UsuariosRepository $usuariosRepository;
  private ItensCompraRepository $itensCompraRepository;
  private ComprasRepository $comprasRepository;
  private RelatoriosRepository $relatoriosRepository;

  private ProdutosService $produtosService;
  private CarrinhosService $carrinhosService;
  private UsuariosService $usuariosService;
  private ComprasService $comprasService;
  private RelatoriosService $relatoriosService;

  private ProdutosController $produtosController;
  private CarrinhosController $carrinhosController;
  private UsuariosController $usuariosController;
  private ComprasController $comprasController;
  private RelatoriosController $relatoriosController;

  private UsuarioLogadoMiddleware $usuarioLogadoMiddleware;
  private FuncionarioMiddleware $funcionarioMiddleware;

  private function __construct()
  {
    $this->pdo = Database::obterInstancia()->obterPdoProd();
    $this->sessao = new SessaoEmArquivo();
    $this->transacao = new UnidadeTransacionalPdo($this->pdo);
  }

  public static function obterInstancia(): self
  {
    if (!isset(self::$instancia)) {
      self::$instancia = new self();
    }

    return self::$instancia;
  }

  public function obterProdutosRepository(): ProdutosRepository
  {
    if (!isset($this->produtosRepository)) {
      $this->produtosRepository = new ProdutosRepositoryBdr($this->pdo);
    }

    return $this->produtosRepository;
  }

  public function obterCarrinhosRepository(): CarrinhosRepository
  {
    if (!isset($this->carrinhosRepository)) {
      $this->carrinhosRepository = new CarrinhosRepositorySessao($this->sessao);
    }

    return $this->carrinhosRepository;
  }

  public function obterUsuariosRepository(): UsuariosRepository
  {
    if (!isset($this->usuariosRepository)) {
      $this->usuariosRepository = new UsuariosRepositoryBdr($this->pdo);
    }

    return $this->usuariosRepository;
  }

  public function obterItensCompraRepository(): ItensCompraRepository
  {
    if (!isset($this->itensCompraRepository)) {
      $this->itensCompraRepository = new ItensCompraRepositoryBdr(
        $this->pdo,
        $this->obterProdutosRepository(),
      );
    }

    return $this->itensCompraRepository;
  }

  public function obterComprasRepository(): ComprasRepository
  {
    if (!isset($this->comprasRepository)) {
      $this->comprasRepository = new ComprasRepositoryBdr(
        $this->pdo,
        $this->obterUsuariosRepository(),
      );
    }

    return $this->comprasRepository;
  }

  public function obterRelatoriosRepository(): RelatoriosRepository
  {
    if (!isset($this->relatoriosRepository)) {
      $this->relatoriosRepository = new RelatoriosRepositoryBdr($this->pdo);
    }

    return $this->relatoriosRepository;
  }

  public function obterProdutosService(): ProdutosService
  {
    if (!isset($this->produtosService)) {
      $this->produtosService = new ProdutosService(
        $this->obterProdutosRepository(),
      );
    }

    return $this->produtosService;
  }

  public function obterCarrinhosService(): CarrinhosService
  {
    if (!isset($this->carrinhosService)) {
      $this->carrinhosService = new CarrinhosService(
        $this->obterCarrinhosRepository(),
        $this->obterProdutosRepository(),
      );
    }

    return $this->carrinhosService;
  }

  public function obterUsuariosService(): UsuariosService
  {
    if (!isset($this->usuariosService)) {
      $this->usuariosService = new UsuariosService(
        $this->obterUsuariosRepository(),
        $this->sessao,
      );
    }

    return $this->usuariosService;
  }

  public function obterComprasService(): ComprasService
  {
    if (!isset($this->comprasService)) {
      $this->comprasService = new ComprasService(
        $this->sessao,
        $this->obterUsuariosRepository(),
        $this->obterCarrinhosRepository(),
        $this->obterItensCompraRepository(),
        $this->obterProdutosRepository(),
        $this->obterComprasRepository(),
        $this->transacao,
      );
    }

    return $this->comprasService;
  }

  public function obterRelatoriosService(): RelatoriosService
  {
    if (!isset($this->relatoriosService)) {
      $this->relatoriosService = new RelatoriosService(
        $this->obterRelatoriosRepository(),
      );
    }

    return $this->relatoriosService;
  }

  public function obterProdutosController(): ProdutosController
  {
    if (!isset($this->produtosController)) {
      $this->produtosController = new ProdutosController(
        $this->obterProdutosService(),
      );
    }

    return $this->produtosController;
  }

  public function obterCarrinhosController(): CarrinhosController
  {
    if (!isset($this->carrinhosController)) {
      $this->carrinhosController = new CarrinhosController(
        $this->obterCarrinhosService(),
      );
    }

    return $this->carrinhosController;
  }

  public function obterUsuariosController(): UsuariosController
  {
    if (!isset($this->usuariosController)) {
      $this->usuariosController = new UsuariosController(
        $this->obterUsuariosService(),
      );
    }

    return $this->usuariosController;
  }

  public function obterComprasController(): ComprasController
  {
    if (!isset($this->comprasController)) {
      $this->comprasController = new ComprasController(
        $this->obterComprasService(),
      );
    }

    return $this->comprasController;
  }

  public function obterRelatoriosController(): RelatoriosController
  {
    if (!isset($this->relatoriosController)) {
      $this->relatoriosController = new RelatoriosController(
        $this->obterRelatoriosService(),
      );
    }

    return $this->relatoriosController;
  }

  public function obterUsuarioLogadoMiddleware(): UsuarioLogadoMiddleware
  {
    if (!isset($this->usuarioLogadoMiddleware)) {
      $this->usuarioLogadoMiddleware = new UsuarioLogadoMiddleware(
        $this->sessao,
        $this->obterUsuariosRepository(),
      );
    }

    return $this->usuarioLogadoMiddleware;
  }

  public function obterFuncionarioMiddleware(): FuncionarioMiddleware
  {
    if (!isset($this->funcionarioMiddleware)) {
      $this->funcionarioMiddleware = new FuncionarioMiddleware();
    }

    return $this->funcionarioMiddleware;
  }
}
