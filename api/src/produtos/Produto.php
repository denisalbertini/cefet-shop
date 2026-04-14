<?php declare(strict_types=1);

class Produto
{
    private string $id;
    private string $nome;
    private string $descricao;
    private int $estoque;
    private int $quantidadeTotalVendida;

    public function __construct(
        string $id,
        string $nome,
        string $descricao,
        int $estoque,
        int $quantidadeTotalVendida,
        private Periodo $lancamento,
        private Url $foto,
        private Cefetin $preco,
        private Promocao|null $promocao = null,
    ) {
        $this->validarDados($id, $nome, $descricao, $estoque, $quantidadeTotalVendida, $promocao);

        $this->id = $id;
        $this->nome = $nome;
        $this->descricao = $descricao;
        $this->estoque = $estoque;
        $this->quantidadeTotalVendida = $quantidadeTotalVendida;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNome()
    {
        return $this->nome;
    }

    public function getDescricao()
    {
        return $this->descricao;
    }

    public function getEstoque()
    {
        return $this->estoque;
    }

    public function getQuantidadeTotalVendida()
    {
        return $this->quantidadeTotalVendida;
    }

    public function getLancamento()
    {
        return $this->lancamento->getValorFormatado();
    }

    public function getFoto()
    {
        return $this->foto->getValor();
    }

    public function getPreco()
    {
        return $this->preco->getValorFormatado();
    }

    public function estaEmPromocao()
    {
        return $this->promocao !== null;
    }

    public function getPrecoPromocional()
    {
        if (!$this->promocao) {
            return null;
        }

        $precoPromocional = new Cefetin(
            (int) ($this->preco->getValorCentavos() * (1 - $this->promocao->getDesconto())),
        );

        return $precoPromocional->getValorFormatado();
    }

    private function validarDados(
        string $id,
        string $nome,
        string $descricao,
        int $estoque,
        int $quantidadeTotalVendida,
        Promocao|null $promocao,
    ) {
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

    public function aplicarPromocao(Promocao $promocao)
    {
        $this->promocao = $promocao;
    }

    public function removerPromocao()
    {
        $this->promocao = null;
    }

    public static function hidratar(array $atributos)
    {
        $id = $atributos['id'];
        $nome = $atributos['nome'];
        $descricao = $atributos['descricao'];
        $estoque = (int) $atributos['estoque'];
        $quantidadeTotalVendida = (int) $atributos['quantidade_total_vendida'];

        $lancamentoDividido = explode('-', $atributos['lancamento']);
        $lancamentoAno = (int) $lancamentoDividido[0];
        $lancamentoSemestre = (int) $lancamentoDividido[1];
        $lancamento = new Periodo($lancamentoAno, $lancamentoSemestre);

        $foto = new Url($atributos['foto']);

        $preco = new Cefetin($atributos['preco']);

        $promocao = null;
        $promocaoId = $atributos['promocao_id'];

        if ($promocaoId) {
            $promocaoNome = $atributos['promocao_nome'];
            $promocaoDesconto = (float) $atributos['promocao_desconto'];

            $promocao = new Promocao(
                $promocaoId,
                $promocaoNome,
                new Porcentagem($promocaoDesconto),
            );
        }

        return new self(
            $id,
            $nome,
            $descricao,
            $estoque,
            $quantidadeTotalVendida,
            $lancamento,
            $foto,
            $preco,
            $promocao,
        );
    }
}
