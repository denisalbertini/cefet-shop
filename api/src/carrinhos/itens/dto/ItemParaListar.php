<?php declare(strict_types=1);

class ItemParaListar
{
    public readonly int $quantidade;
    public readonly string $subTotal;
    public readonly string $produtoId;
    public readonly string $produtoFoto;
    public readonly string $produtoNome;
    public readonly int $produtoEstoque;

    public function __construct(Item $item)
    {
        $this->quantidade = $item->quantidade;
        $this->subTotal = $item->obterSubTotal()->getValorFormatado();
        $this->produtoId = $item->produto->id;
        $this->produtoFoto = $item->produto->foto->valor;
        $this->produtoNome = $item->produto->nome;
        $this->produtoEstoque = $item->produto->estoque;
    }
}
