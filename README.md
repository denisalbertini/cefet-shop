# Cefet Shop

Projeto acadêmico de sistema Web de loja virtual. Desenvolvido com PHP e Composer para o back-end e TypeScript e Vite para o front-end. Testado com Kahlan, Vitest e Playwright. Qualificado com PHPStan.

## Instalação

```bash
# Para instalar as dependências da aplicação
$ pnpm i

# Para instalar as dependências da API
$ cd api && composer i
```

## Banco de Dados

Para criar e popular o banco de dados, deve-se executar os seguintes scripts (encontrados em api/sql):

- database_prod.sql
- database_test.sql
- dados.sql

## Scripts úteis

### API

```bash
# Para iniciar o servidor
$ composer start

# Para executar os testes (requer conexão com o banco de dados)
$ composer test
```

### Aplicação

```bash
# Para iniciar o app
$ pnpm start

# Para executar os testes unitários
$ pnpm test

# Para executar os testes e2e
$ pnpm run e2e
```

## Referências

### Interface

A interface foi construída com as distribuições de css e js do Bootstrap 5, carregadas localmente através do [pacote npm](https://www.npmjs.com/package/bootstrap).

### Imagens

- Logo Cefet/RJ: [Identidade visual](https://www.cefet-rj.br/index.php/identidade-visual)
- Imagens dos produtos: disponíveis sob licença [Unsplash](https://unsplash.com/pt-br/licen%C3%A7a)
