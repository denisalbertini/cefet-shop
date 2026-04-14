<?php declare(strict_types=1);

class ProdutosController
{
    private ProdutosView $produtosView;

    public function __construct(private ProdutosService $produtosService)
    {
        $this->produtosView = new ProdutosView($this);
    }

    public function getView()
    {
        return $this->produtosView;
    }

    public function buscar(int $pagina, int $limit): array
    {
        return $this->produtosService->buscar($pagina, $limit);
    }

    public function buscarPorId(string $id): Produto
    {
        return $this->produtosService->buscarPorId($id);
    }
}
