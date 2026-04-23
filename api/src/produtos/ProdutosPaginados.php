<?php declare(strict_types=1);

class ProdutosPaginados
{
    public readonly int $paginaAtual;
    public readonly int $totalPaginas;

    /**
     * @param ProdutoParaListar[] $produtos
     */
    public function __construct(
        int $paginaAtual,
        int $totalPaginas,
        public readonly bool $temProx,
        public readonly bool $temAnt,
        public readonly array $produtos,
    ) {
        $this->validarDados($paginaAtual, $totalPaginas);

        $this->paginaAtual = $paginaAtual;
        $this->totalPaginas = $totalPaginas;
    }

    private function validarDados(int $paginaAtual, int $totalPaginas): void
    {
        $erros = [];

        if ($paginaAtual <= 0) {
            array_push($erros, MensagemErro::PRODUTOS_PAGINADOS_PAGINA_ATUAL);
        }

        if ($totalPaginas <= 0) {
            array_push($erros, MensagemErro::PRODUTOS_PAGINADOS_TOTAL_PAGINAS);
        }

        if (sizeof($erros) > 0) {
            throw new DomainException(FormatadorMensagem::formatarMensagemErro($erros));
        }
    }
}
