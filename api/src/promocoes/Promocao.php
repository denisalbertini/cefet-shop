<?php declare(strict_types=1);

class Promocao
{
    private string $id;
    private string $nome;

    public function __construct(string $id, string $nome, private Porcentagem $desconto)
    {
        $this->validarDados($id, $nome);

        $this->id = $id;
        $this->nome = $nome;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getNome()
    {
        return $this->nome;
    }

    public function getDesconto()
    {
        return $this->desconto->getValor();
    }

    private function validarDados(string $id, string $nome)
    {
        $erros = [];

        if (!preg_match(Regex::ID, $id)) {
            array_push($erros, MensagemErro::ID);
        }

        if (mb_strlen($nome) < 3) {
            array_push($erros, MensagemErro::PROMOCAO_VALOR);
        }

        if (sizeof($erros) > 0) {
            throw new DomainException(FormatadorMensagem::formatarMensagemErro($erros));
        }
    }
}
