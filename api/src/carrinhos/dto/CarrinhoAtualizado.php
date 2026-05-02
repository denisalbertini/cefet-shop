<?php declare(strict_types=1);

class CarrinhoAtualizado
{
    public readonly string $produtoId;
    public readonly string|null $subTotal;
    public readonly string $total;

    public function __construct(Carrinho $carrinho, string $produtoId)
    {
        $indiceItem = $carrinho->obterIndiceItem($produtoId);

        $subTotal = is_numeric($indiceItem)
            ? $carrinho->itens[$indiceItem]->obterSubTotal()->getValorFormatado()
            : null;

        $total = $carrinho->obterTotal()->getValorFormatado();

        $this->produtoId = $produtoId;
        $this->subTotal = $subTotal;
        $this->total = $total;
    }
}
