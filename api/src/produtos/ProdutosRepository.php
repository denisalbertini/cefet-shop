<?php declare(strict_types=1);

interface ProdutosRepository
{
    /**
     * @return Produto[]
     */
    public function buscar(Paginacao $paginacao): array;

    public function buscarPorId(string $id): Produto;
}
