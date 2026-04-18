<?php declare(strict_types=1);

class ProdutoParaHidratar
{
    public function __construct(
        public string $id = '',
        public string $nome = '',
        public string $descricao = '',
        public int $estoque = 0,
        public int $quantidadeTotalVendida = 0,
        public string $lancamento = '',
        public string $foto = '',
        public int $preco = 0,
        public string|null $promocaoId = null,
        public string|null $promocaoNome = null,
        public float|null $promocaoDesconto = null,
    ) {}
}
