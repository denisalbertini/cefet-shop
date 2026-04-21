<?php

class MensagemErro
{
    public const string CEFETIN_VALOR = 'O valor em Cefetin não pode ser menor que 0.';

    public const string PORCENTAGEM_VALOR = 'O valor de Porcentagem deve ser estar no intervalo (0, 100].';

    public const string PROMOCAO_VALOR = 'O nome de uma Promoção não deve ter menos de 3 caracteres.';

    public const string PERIODO_ANO = 'O ano de um Período não pode ser menor que 2014 e maior que o ano atual.';
    public const string PERIODO_SEMESTRE = 'O semestre de um Período deve ser 1 ou 2.';

    public const string URL_VALOR = 'O valor da Url é inválido.';

    public const string PRODUTO_NOME = 'O nome de um Produto não pode ter menos de 3 caracteres.';
    public const string PRODUTO_DESCRICAO = 'A descrição de um Produto não pode ter menos de 3 caracteres';
    public const string PRODUTO_ESTOQUE = 'O estoque de um Produto não pode ser menor que 0.';
    public const string PRODUTO_QUANTIDADE_TOTAL_VENDIDA = 'A quantidade total vendida de um Produto não pode ser menor que 0.';
    public const string PRODUTO_PROMOCAO = 'Um Produto só pode receber promoção que ofereça desconto de 5 a 20%.';

    public const string PAGINACAO_PAGINA = 'A página de uma Paginação não pode menor ou igual a 0.';
    public const string PAGINACAO_LIMIT = 'O limit de uma Paginação não pode ser menor ou igual a 0.';

    public const string ID = 'ID inválido.';

    public const string DATABASE_CONNECTION = 'Não foi possível conectar ao banco de dados.';

    public const string PRODUTOS_REPOSITORY_NOT_FOUND = 'Produto não encontrado.';

    public const string PRODUTOS_CONTROLLER_ID = 'ID do produto não recebido.';
}
