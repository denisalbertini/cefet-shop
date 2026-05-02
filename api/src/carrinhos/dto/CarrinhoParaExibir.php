<?php declare(strict_types=1);

class CarrinhoParaExibir
{
    public readonly string $total;

    /**
     * @var ItemParaListar[]
     */
    public array $itens;

    public function __construct(Carrinho $carrinho)
    {
        $this->total = $carrinho->obterTotal()->getValorFormatado();

        $this->itens = [];

        foreach ($carrinho->itens as $item) {
            array_push($this->itens, new ItemParaListar($item));
        }
    }
}
