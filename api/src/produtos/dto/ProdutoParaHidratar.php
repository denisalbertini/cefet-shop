<?php declare(strict_types=1);

class ProdutoParaHidratar
{
    public string $id;
    public string $nome;
    public string $descricao;
    public int $estoque;
    public int $quantidadeTotalVendida;
    public string $lancamento;
    public string $foto;
    public int $preco;
    public string|null $promocaoId;
    public string|null $promocaoNome;
    public float|null $promocaoDesconto;
}
