<?php declare(strict_types=1);

require_once __DIR__ . '/../vendor/autoload.php';

describe('ProdutosRepositoryBdr', function () {
    beforeAll(function () {
        $this->pdo = Database::getInstancia()->getPdoTest();

        $sql = file_get_contents(__DIR__ . '/../sql/dados_test_produtos.sql');

        $this->pdo->exec($sql);

        $this->repository = new ProdutosRepositoryBdr($this->pdo);
    });

    it('deveria retornar um array de produtos', function () {
        $produtos = $this->repository->buscar(new Paginacao(1, 6));

        foreach ($produtos as $produto) {
            expect(get_class($produto))->toBe(Produto::class);
        }
    });

    it('deveria retornar um produto por id', function () {
        $produto = $this->repository->buscarPorId('cdd0d7b7-e417-4f42-b76c-dc6a4506a2e3');

        expect(get_class($produto))->toBe(Produto::class);
    });

    it('deveria lançar um erro ao não encontrar o produto por id', function () {
        expect(function () {
            $this->repository->buscarPorId('abc');
        })->toThrow(MensagemErro::PRODUTOS_REPOSITORY_NOT_FOUND);
    });

    it('deveria retornar a contagem de produtos', function () {
        $contagem = $this->repository->contar();

        expect($contagem)->toBe(3);
    });
});
