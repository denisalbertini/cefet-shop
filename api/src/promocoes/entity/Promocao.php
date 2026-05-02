<?php declare(strict_types=1);

class Promocao
{
    public string $id;
    public string $nome;

    public function __construct(string $id, string $nome, public Porcentagem $desconto)
    {
        $this->validarDados($id, $nome);

        $this->id = $id;
        $this->nome = $nome;
    }

    public function getDesconto(): float
    {
        return $this->desconto->valor;
    }

    private function validarDados(string $id, string $nome): void
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
