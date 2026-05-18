<?php declare(strict_types=1);

class RelatoriosService
{
  public function __construct(
    private Sessao $sessao,
    private UsuariosRepository $usuariosRepository,
    private RelatoriosRepository $relatoriosRepository,
  ) {}

  public function buscarVendas(
    Data $inicio,
    Data $fim,
  ): RelatorioVendasParaExibir {
    $this->verificarFuncionario();

    $linhas = $this->relatoriosRepository->buscarVendasPorPeriodo(
      $inicio,
      $fim,
    );

    $totalGeralCentavos = 0;
    $vendas = [];

    foreach ($linhas as $linha) {
      $totalGeralCentavos += $linha->total;
      array_push(
        $vendas,
        new VendaPorDataParaExibir($linha->data, $linha->total),
      );
    }

    $totalGeral = new Cefetin($totalGeralCentavos)->obterValorFormatado();

    return new RelatorioVendasParaExibir($totalGeral, $vendas);
  }

  public function buscarTopItens(
    Data $inicio,
    Data $fim,
  ): RelatorioTopItensParaExibir {
    $this->verificarFuncionario();

    $linhas = $this->relatoriosRepository->buscarTopItensPorPeriodo(
      $inicio,
      $fim,
    );

    $itens = [];

    foreach ($linhas as $linha) {
      array_push(
        $itens,
        new ItemMaisVendidoParaExibir(
          $linha->nomeProduto,
          $linha->quantidadeVendas,
        ),
      );
    }

    return new RelatorioTopItensParaExibir($itens);
  }

  private function verificarFuncionario(): void
  {
    $usuarioId = $this->sessao->obter(ChaveSessao::USUARIO);

    if (!is_string($usuarioId)) {
      throw new HttpException(401);
    }

    $usuario = $this->usuariosRepository->buscarPorId($usuarioId);

    if (!($usuario instanceof Funcionario)) {
      throw new HttpException(403);
    }
  }
}
