<?php declare(strict_types=1);

class ProdutoParaDetalhar
{
    public function __construct(
        public readonly string $id,
        public readonly string $foto,
        public readonly string $nome,
        public readonly string $lancamento,
        public readonly string $descricao,
        public readonly string $preco,
        public readonly string|null $precoPromocional,
        public readonly int $estoque,
    ) {}
}
