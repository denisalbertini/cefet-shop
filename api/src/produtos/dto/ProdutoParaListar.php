<?php declare(strict_types=1);

class ProdutoParaListar
{
  public readonly string $id;
  public readonly string $foto;
  public readonly string $nome;
  public readonly string $preco;
  public readonly string|null $precoPromocional;

  public function __construct(Produto $produto)
  {
    $this->id = $produto->id;
    $this->foto = $produto->foto->valor;
    $this->nome = $produto->nome;
    $this->preco = $produto->preco->getValorFormatado();
    $this->precoPromocional = $produto
      ->getPrecoPromocional()
      ?->getValorFormatado();
  }
}
