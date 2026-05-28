<?php declare(strict_types=1);

class RelatoriosService
{
  public function __construct(
    private RelatoriosRepository $relatoriosRepository,
  ) {}

  public function buscarVendas(
    Data $inicio,
    Data $fim,
  ): RelatorioVendasParaExibir {
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
}
