<?php

class MensagemErro
{
  public const string VALOR_INVALIDO_CEFETIN = 'O valor em Cefetin não pode ser menor que 0.';
  public const string VALOR_INVALIDO_PORCENTAGEM = 'O valor de Porcentagem deve ser estar no intervalo (0, 100].';
  public const string NOME_INVALIDO_PROMOCAO = 'O nome de uma Promoção não deve ter menos de 3 caracteres.';
  public const string PERIODO_ANO_INVALIDO = 'O ano de um Período não pode ser menor que 2014 e maior que o ano atual.';
  public const string PERIODO_SEMESTRE_INVALIDO = 'O semestre de um Período deve estar no intervalo (0,20].';
}
