<?php declare(strict_types=1);

class ProdutosController
{
    public readonly ProdutosView $produtosView;

    public function __construct(private ProdutosService $produtosService)
    {
        $this->produtosView = new ProdutosView($this);
    }

    /**
     * @return ProdutoParaListar[]
     */
    public function listar(int $pagina, int $limit): array
    {
        return $this->produtosService->listar($pagina, $limit);
    }

    public function buscarPorId(string $id): ProdutoParaDetalhar
    {
        return $this->produtosService->buscarPorId($id);
    }
}
