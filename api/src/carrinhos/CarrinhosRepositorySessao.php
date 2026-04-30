<?php declare(strict_types=1);

class CarrinhosRepositorySessao implements CarrinhosRepository
{
    private Sessao $sessao;
    private string $chaveCarrinho;

    public function __construct()
    {
        $this->sessao = new Sessao();
        $this->chaveCarrinho = 'carrinho';
    }

    public function buscar(): Carrinho
    {
        $carrinho = $this->sessao->obter($this->chaveCarrinho);

        if (!($carrinho instanceof Carrinho)) {
            $carrinho = new Carrinho([
                new Item(
                    1,
                    new Produto(
                        '84490d7b-5f06-4443-b064-ef1cd76b9ced',
                        'Camiseta Sistemas',
                        'Camiseta do curso de Sistemas',
                        120,
                        450,
                        new Periodo(2014, 1),
                        new Url('https://placehold.co/400x500'),
                        new Cefetin(5990),
                    ),
                ),
                new Item(
                    1,
                    new Produto(
                        'ecfe344b-1437-4774-a4b5-580a2dc4ae7d',
                        'Calça Engenharia',
                        'Calça do curso de Engenharia',
                        8,
                        320,
                        new Periodo(2014, 2),
                        new Url('https://placehold.co/400x500'),
                        new Cefetin(12990),
                    ),
                ),
            ]);

            $this->salvar($carrinho);
        }

        return $carrinho;
    }

    public function adicionar(Item $item): void
    {
        $carrinho = $this->buscar();
        $indiceItem = $carrinho->obterIndiceItem($item->produto->id);

        if (!$indiceItem) {
            $carrinho->adicionarItem($item);
        } else {
            $carrinho->itens[$indiceItem]->setQuantidade(
                $carrinho->itens[$indiceItem]->quantidade + $item->quantidade,
            );
        }

        $this->salvar($carrinho);
    }

    public function alterar(Item $item): Carrinho
    {
        $carrinho = $this->buscar();
        $indiceItem = $carrinho->obterIndiceItem($item->produto->id);

        if (!is_numeric($indiceItem)) {
            throw new RepositoryException(MensagemErro::CARRINHOS_REPOSITORY_NOT_FOUND, 404);
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
            throw new RepositoryException(MensagemErro::CARRINHOS_REPOSITORY_NOT_FOUND, 404);
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
