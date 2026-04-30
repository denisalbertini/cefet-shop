<?php declare(strict_types=1);

interface CarrinhosRepository
{
    public function buscar(): Carrinho;
    public function adicionar(Item $item): void;
    public function alterar(Item $item): Carrinho;
    public function removerItem(string $produtoId): Carrinho;
}
