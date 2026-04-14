<?php declare(strict_types=1);

interface ProdutosRepository
{
    public function buscar(Paginacao $paginacao): array;
    public function buscarPorId(string $id): Produto;
}
