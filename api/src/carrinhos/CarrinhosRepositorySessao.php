<?php declare(strict_types=1);

class CarrinhosRepositorySessao implements CarrinhosRepository
{
  private Sessao $sessao;
  private string $chaveCarrinho;

  public function __construct()
  {
    $this->sessao = new SessaoEmArquivo();
    $this->chaveCarrinho = 'carrinho';
  }

  public function buscar(): Carrinho
  {
    $carrinho = $this->sessao->obter($this->chaveCarrinho);

    if (!($carrinho instanceof Carrinho)) {
      $carrinho = new Carrinho([]);

      $this->salvar($carrinho);
    }

    return $carrinho;
  }

  public function buscarQuantidadeItens(): int
  {
    $carrinho = $this->buscar();

    return sizeof($carrinho->itens);
  }

  public function adicionar(Item $item): int
  {
    $carrinho = $this->buscar();
    $indiceItem = $carrinho->obterIndiceItem($item->produto->id);

    if (!is_numeric($indiceItem)) {
      $carrinho->adicionarItem($item);
    } else {
      $carrinho->itens[$indiceItem]->definirQuantidade(
        $carrinho->itens[$indiceItem]->quantidade + $item->quantidade,
      );
    }

    $this->salvar($carrinho);

    return sizeof($carrinho->itens);
  }

  public function alterar(Item $item): Carrinho
  {
    $carrinho = $this->buscar();
    $indiceItem = $carrinho->obterIndiceItem($item->produto->id);

    if (!is_numeric($indiceItem)) {
      throw new RepositoryException(
        MensagemErro::CARRINHOS_REPOSITORY_NOT_FOUND,
        404,
      );
    }

    $carrinho->substituirItem($indiceItem, $item);

    $this->salvar($carrinho);

    return $carrinho;
  }

  public function removerItem(string $produtoId): Carrinho
  {
    $carrinho = $this->buscar();
    $indiceItem = $carrinho->obterIndiceItem($produtoId);

    if (!is_numeric($indiceItem)) {
      throw new RepositoryException(
        MensagemErro::CARRINHOS_REPOSITORY_NOT_FOUND,
        404,
      );
    }

    array_splice($carrinho->itens, $indiceItem, 1);

    $this->salvar($carrinho);

    return $carrinho;
  }

  private function salvar(Carrinho $carrinho): void
  {
    $this->sessao->salvar($this->chaveCarrinho, $carrinho);
  }
}
