<?php declare(strict_types=1);

class Promocao
{
    private string $nome;

    public function __construct(string $nome, private Porcentagem $desconto)
    {
        $this->setNome($nome);
    }

    public function getNome()
    {
        return $this->nome;
    }

    public function getDesconto()
    {
        return $this->desconto->getValor();
    }

    private function setNome(string $nome)
    {
        if (mb_strlen($nome) < 3) {
            throw new DomainException(MensagemErro::PROMOCAO_VALOR);
        }

        $this->nome = $nome;
    }
}
