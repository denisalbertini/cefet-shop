<?php declare(strict_types=1);

class ProdutosController
{
    public function __construct(private ProdutosService $produtosService) {}

    public function buscar(int $pagina, int $limit): array
    {
        return $this->produtosService->buscar($pagina, $limit);
    }

    public function buscarPorId(string $id): Produto
    {
        return $this->produtosService->buscarPorId($id);
    }
}
