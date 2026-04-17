<?php declare(strict_types=1);

class ProdutoParaListar
{
    public function __construct(
        public readonly string $id,
        public readonly string $foto,
        public readonly string $nome,
        public readonly string $preco,
        public readonly string|null $precoPromocional,
    ) {}
}
