<?php declare(strict_types=1);

class ProdutosService
{
    public function __construct(private ProdutosRepository $produtosRepository) {}

    public function buscar(int $pagina, int $limit): array
    {
        $paginacao = new Paginacao($pagina, $limit);

        return $this->produtosRepository->buscar($paginacao);
    }

    public function buscarPorId(string $id): Produto
    {
        return $this->produtosRepository->buscarPorId($id);
    }
}
