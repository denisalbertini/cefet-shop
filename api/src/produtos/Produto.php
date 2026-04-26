<?php declare(strict_types=1);

class Produto
{
    public string $id;
    public string $nome;
    public string $descricao;
    public int $estoque;
    public int $quantidadeTotalVendida;

    public function __construct(
        string $id,
        string $nome,
        string $descricao,
        int $estoque,
        int $quantidadeTotalVendida,
        public Periodo $lancamento,
        public Url $foto,
        public Cefetin $preco,
        public Promocao|null $promocao = null,
    ) {
        $this->validarDados($id, $nome, $descricao, $estoque, $quantidadeTotalVendida, $promocao);

        $this->id = $id;
        $this->nome = $nome;
        $this->descricao = $descricao;
        $this->estoque = $estoque;
        $this->quantidadeTotalVendida = $quantidadeTotalVendida;
    }

    public function estaEmPromocao(): bool
    {
        return $this->promocao !== null;
    }

    public function getPrecoPromocional(): Cefetin|null
    {
        if (!$this->promocao) {
            return null;
        }

        $precoPromocional = new Cefetin(
            (int) ($this->preco->valorCentavos * (1 - $this->promocao->getDesconto())),
        );

        return $precoPromocional;
    }

    private function validarDados(
        string $id,
        string $nome,
        string $descricao,
        int $estoque,
        int $quantidadeTotalVendida,
        Promocao|null $promocao,
    ): void {
        $erros = [];

        if (!preg_match(Regex::ID, $id)) {
            array_push($erros, MensagemErro::ID);
        }

        if (mb_strlen($nome) < 3) {
            array_push($erros, MensagemErro::PRODUTO_NOME);
        }

        if (mb_strlen($descricao) < 3) {
            array_push($erros, MensagemErro::PRODUTO_DESCRICAO);
        }

        if ($estoque < 0) {
            array_push($erros, MensagemErro::PRODUTO_ESTOQUE);
        }

        if ($quantidadeTotalVendida < 0) {
            array_push($erros, MensagemErro::PRODUTO_QUANTIDADE_TOTAL_VENDIDA);
        }

        $desconto = $promocao?->getDesconto();

        if ($desconto && ($desconto < 0.05 || $desconto > 0.2)) {
            array_push($erros, MensagemErro::PRODUTO_PROMOCAO);
        }

        if (sizeof($erros) > 0) {
            throw new DomainException(FormatadorMensagem::formatarMensagemErro($erros));
        }
    }

    public function aplicarPromocao(Promocao $promocao): void
    {
        $this->promocao = $promocao;
    }

    public function removerPromocao(): void
    {
        $this->promocao = null;
    }

    public static function hidratar(ProdutoParaHidratar $produtoParaHidratar): self
    {
        $lancamentoDividido = explode('-', $produtoParaHidratar->lancamento);
        $lancamentoAno = (int) $lancamentoDividido[0];
        $lancamentoSemestre = (int) $lancamentoDividido[1];
        $lancamento = new Periodo($lancamentoAno, $lancamentoSemestre);

        $foto = new Url($produtoParaHidratar->foto);

        $preco = new Cefetin($produtoParaHidratar->preco);

        $promocao = null;
        $promocaoId = $produtoParaHidratar->promocaoId;
        $promocaoNome = $produtoParaHidratar->promocaoNome;
        $promocaoDesconto = $produtoParaHidratar->promocaoDesconto;

        if ($promocaoId && $promocaoNome && $promocaoDesconto) {
            $promocao = new Promocao(
                $promocaoId,
                $promocaoNome,
                new Porcentagem($promocaoDesconto),
            );
        }

        return new self(
            $produtoParaHidratar->id,
            $produtoParaHidratar->nome,
            $produtoParaHidratar->descricao,
            $produtoParaHidratar->estoque,
            $produtoParaHidratar->quantidadeTotalVendida,
            $lancamento,
            $foto,
            $preco,
            $promocao,
        );
    }
}
