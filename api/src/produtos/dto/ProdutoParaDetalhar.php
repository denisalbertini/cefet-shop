<?php declare(strict_types=1);

class ProdutoParaDetalhar
{
  public readonly string $id;
  public readonly string $foto;
  public readonly string $nome;
  public readonly string $lancamento;
  public readonly string $descricao;
  public readonly string $preco;
  public readonly string|null $precoPromocional;
  public readonly int $estoque;

  public function __construct(Produto $produto)
  {
    $this->id = $produto->id;
    $this->foto = $produto->foto->valor;
    $this->nome = $produto->nome;
    $this->lancamento = $produto->lancamento->getValorFormatado();
    $this->descricao = $produto->descricao;
    $this->preco = $produto->preco->getValorFormatado();
    $this->precoPromocional = $produto
      ->getPrecoPromocional()
      ?->getValorFormatado();
    $this->estoque = $produto->estoque;
  }
}
