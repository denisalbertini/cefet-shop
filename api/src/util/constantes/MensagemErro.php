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
  public const string PRODUTOS_REPOSITORY_COUNT = 'Erro ao contar o número de registros.';

  public const string PRODUTOS_CONTROLLER_ID = 'ID do produto não recebido.';

  public const string PRODUTOS_PAGINADOS_PAGINA_ATUAL = 'O atributo paginaAtual de ProdutosPaginados não pode ser menor ou igual a 0.';
  public const string PRODUTOS_PAGINADOS_TOTAL_PAGINAS = 'O atributo totalPaginas de ProdutosPaginados não pode ser menor ou igual a 0.';

  public const string REPOSITORY_UNEXPECTED = 'Erro inesperado ao executar a consulta.';

  public const string ITEM_QUANTIDADE = 'O atributo quantidade de Item não pode ser menor ou igual a 0.';

  public const string CARRINHOS_REPOSITORY_NOT_FOUND = 'Item não encontrado.';

  public const string CARRINHOS_CONTROLLER_QUANTIDADE = 'Valor inesperado recebido para a quantidade do produto.';

  public const string CARRINHOS_SERVICE_QUANTIDADE = 'O produto não está em estoque.';

  public const string USUARIOS_REPOSITORY_NOT_FOUND = 'Usuário não encontrado.';

  public const string USUARIOS_SERVICE_LOGIN = 'Identificador ou senha incorretos.';
  public const string USUARIOS_SERVICE_LOGADO = 'Usuário já está logado.';
  public const string USUARIOS_SERVICE_NOT_FOUND = 'Não há usuário logado.';

  public const string USUARIOS_CONTROLLER_LOGIN = 'Identificador e/ou senha não recebidos.';
}
