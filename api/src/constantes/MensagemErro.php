<?php

class MensagemErro
{
    public const string CEFETIN_VALOR = 'O valor em Cefetin não pode ser menor que 0.';

    public const string PORCENTAGEM_VALOR = 'O valor de Porcentagem deve ser estar no intervalo (0, 100].';

    public const string PROMOCAO_VALOR = 'O nome de uma Promoção não deve ter menos de 3 caracteres.';

    public const string PERIODO_ANO = 'O ano de um Período não pode ser menor que 2014 e maior que o ano atual.';
    public const string PERIODO_SEMESTRE = 'O semestre de um Período deve estar no intervalo (0,20].';

    public const string URL_VALOR = 'O valor da Url é inválido.';
}
