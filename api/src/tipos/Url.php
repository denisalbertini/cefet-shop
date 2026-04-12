<?php declare(strict_types=1);

class Url
{
  private string $valor;
  private string $regex = '/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/';

  public function __construct(string $valor)
  {
    $this->setValor($valor);
  }

  public function getValor()
  {
    return $this->valor;
  }

  private function setValor(string $valor)
  {
    if (!preg_match($this->regex, $valor)) {
      throw new DomainException(MensagemErro::URL_VALOR_INVALIDO);
    }

    $this->valor = $valor;
  }
}
