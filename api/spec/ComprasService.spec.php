<?php declare(strict_types=1);

use Kahlan\Plugin\Double;

describe('ComprasService', function () {
  beforeAll(function () {
    $this->pdo = Database::obterInstancia()->obterPdoTest();

    $sql = file_get_contents(__DIR__ . '/../sql/dados_test_compras.sql');

    $this->pdo->exec($sql);
  });

  describe('Erro ao tentar finalizar a compra', function () {
    beforeAll(function () {
      $sessao = Double::instance([
        'implements' => [Sessao::class],
      ]);
      $carrinhosRepository = Double::instance([
        'implements' => [CarrinhosRepository::class],
      ]);
      $itensRepository = Double::instance([
        'implements' => [ItensRepository::class],
      ]);
      $comprasRepository = Double::instance([
        'implements' => [ComprasRepository::class],
      ]);
      $usuariosRepository = new UsuariosRepositoryBdr($this->pdo);
      $produtosRepository = new ProdutosRepositoryBdr($this->pdo);

      $this->service = new ComprasService(
        $sessao,
        $usuariosRepository,
        $carrinhosRepository,
        $itensRepository,
        $produtosRepository,
        $comprasRepository,
      );

      $this->sessao = $sessao;
      $this->carrinhosRepository = $carrinhosRepository;
    });

    it(
      'deveria lançar uma exceção ao tentar finalizar a compra sem estar logado.',
      function () {
        allow($this->sessao)->toReceive('obter')->andReturn(null);

        try {
          $this->service->registrar();

          throw new Exception('O método não lançou a exceção como esperado.');
        } catch (HttpException $e) {
          expect($e->obterStatus())->toBe(401);
        }
      },
    );

    it(
      'deveria lançar uma exceção ao tentar finalizar a compra com saldo insuficiente.',
      function () {
        allow($this->sessao)
          ->toReceive('obter')
          ->andReturn('d4314882-012b-4b84-9626-4208f4ed8264');

        allow($this->carrinhosRepository)
          ->toReceive('buscar')
          ->andReturn(
            new Carrinho([
              new Item(
                10,
                new Produto(
                  '1aa818b4-c423-4fda-84a9-14a28fa0a93d',
                  'produto',
                  'descricao',
                  10,
                  100,
                  new Periodo(2014, 1),
                  new Url('url'),
                  new Cefetin(1000),
                ),
              ),
            ]),
          );

        try {
          $this->service->registrar();

          throw new Exception('O método não lançou a exceção como esperado.');
        } catch (HttpException $e) {
          expect($e->obterStatus())->toBe(400);
          expect($e->obterErros())->toEqual([
            MensagemErro::COMPRAS_SERVICE_SALDO_INSUFICIENTE,
          ]);
        }
      },
    );

    it(
      'deveria lançar uma exceção caso um item do carrinho seja alterado pelo servidor.',
      function () {
        allow($this->sessao)
          ->toReceive('obter')
          ->andReturn('3f44131b-867f-4ff5-973b-b80cc85520d9');

        allow($this->carrinhosRepository)
          ->toReceive('buscar')
          ->andReturn(
            new Carrinho([
              new Item(
                10,
                new Produto(
                  '1886d640-b904-48a5-bb1b-9ca97a1fa773',
                  'produto',
                  'descricao',
                  10,
                  100,
                  new Periodo(2014, 1),
                  new Url('url'),
                  new Cefetin(1000),
                ),
              ),
            ]),
          );

        allow($this->carrinhosRepository)
          ->toReceive('alterar')
          ->andReturn(new Carrinho([]));

        try {
          $this->service->registrar();

          throw new Exception('O método não lançou a exceção como esperado.');
        } catch (HttpException $e) {
          expect($e->obterStatus())->toBe(400);
          expect($e->obterErros())->toEqual([
            MensagemErro::COMPRAS_SERVICE_ITEM_ALTERADO,
          ]);
        }
      },
    );

    it(
      'deveria lançar uma exceção caso um item do carrinho seja removido pelo servidor.',
      function () {
        allow($this->sessao)
          ->toReceive('obter')
          ->andReturn('3f44131b-867f-4ff5-973b-b80cc85520d9');

        allow($this->carrinhosRepository)
          ->toReceive('buscar')
          ->andReturn(
            new Carrinho([
              new Item(
                10,
                new Produto(
                  'ee1dc0d7-4f42-4c4b-83c7-8df5ffe25706',
                  'produto',
                  'descricao',
                  10,
                  100,
                  new Periodo(2014, 1),
                  new Url('url'),
                  new Cefetin(1000),
                ),
              ),
            ]),
          );

        allow($this->carrinhosRepository)
          ->toReceive('removerItem')
          ->andReturn(new Carrinho([]));

        try {
          $this->service->registrar();

          throw new Exception('O método não lançou a exceção como esperado.');
        } catch (HttpException $e) {
          expect($e->obterStatus())->toBe(400);
          expect($e->obterErros())->toEqual([
            MensagemErro::COMPRAS_SERVICE_ITEM_REMOVIDO,
          ]);
        }
      },
    );
  });

  describe('Compra finalizada com sucesso', function () {
    beforeAll(function () {
      $sessao = Double::instance([
        'implements' => [Sessao::class],
        'stubMethods' => ['obter' => '3f44131b-867f-4ff5-973b-b80cc85520d9'],
      ]);

      $carrinhosRepository = Double::instance([
        'implements' => [CarrinhosRepository::class],
        'stubMethods' => [
          'buscar' => new Carrinho([
            new Item(
              10,
              new Produto(
                '1aa818b4-c423-4fda-84a9-14a28fa0a93d',
                'produto',
                'descricao',
                10,
                100,
                new Periodo(2014, 1),
                new Url('url'),
                new Cefetin(1000),
              ),
            ),
          ]),
        ],
      ]);
      $usuariosRepository = new UsuariosRepositoryBdr($this->pdo);
      $produtosRepository = new ProdutosRepositoryBdr($this->pdo);
      $itensRepository = new ItensRepositoryBdr(
        $this->pdo,
        $produtosRepository,
      );
      $comprasRepository = new ComprasRepositoryBdr(
        $this->pdo,
        $usuariosRepository,
      );

      $service = new ComprasService(
        $sessao,
        $usuariosRepository,
        $carrinhosRepository,
        $itensRepository,
        $produtosRepository,
        $comprasRepository,
      );

      $this->usuariosRepository = $usuariosRepository;
      $this->itensRepository = $itensRepository;
      $this->produtosRepository = $produtosRepository;
      $this->comprasRepository = $comprasRepository;

      $compraId = $service->registrar();

      $this->compraId = $compraId;
    });

    it(
      'deveria atualizar o saldo do usuário ao finalizar a compra.',
      function () {
        $usuario = $this->usuariosRepository->buscarPorId(
          '3f44131b-867f-4ff5-973b-b80cc85520d9',
        );

        expect($usuario->saldo->valorCentavos)->toBe(90000);
      },
    );

    it('deveria registrar a compra ao finalizar.', function () {
      $compra = $this->comprasRepository->buscarPorId($this->compraId);

      expect($compra->numeroCompra)->toBeA('int');
      expect($compra->data)->toBeA('object');
      expect($compra->total->valorCentavos)->toBe(10000);
    });

    it('deveria registrar os itens ao finalizar a compra.', function () {
      $itens = $this->itensRepository->buscarPorCompraId($this->compraId);

      $item = $itens[0];

      expect($item->quantidade)->toBe(10);
    });

    it('deveria atualizar os produtos ao finalizar a compra.', function () {
      $produto = $this->produtosRepository->buscarPorId(
        '1aa818b4-c423-4fda-84a9-14a28fa0a93d',
      );

      expect($produto->estoque)->toBe(5);
      expect($produto->quantidadeTotalVendida)->toBe(110);
    });
  });
});
