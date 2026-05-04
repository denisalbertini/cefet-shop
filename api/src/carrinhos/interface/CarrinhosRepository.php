<?php declare(strict_types=1);

interface CarrinhosRepository
{
  public function buscar(): Carrinho;
  public function buscarQuantidadeItens(): int;
  public function adicionar(Item $item): int;
  public function alterar(Item $item): Carrinho;
  public function removerItem(string $produtoId): Carrinho;
}
