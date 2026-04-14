CREATE DATABASE IF NOT EXISTS g7_prod DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE g7_prod;

CREATE TABLE promocao (
  id CHAR(36) PRIMARY KEY DEFAULT UUID(),
  nome VARCHAR(100) NOT NULL,
  desconto DECIMAL(5, 2) NOT NULL
);

CREATE TABLE produto (
  id CHAR(36) PRIMARY KEY DEFAULT UUID(),
  nome VARCHAR(100) NOT NULL,
  descricao TINYTEXT NOT NULL,
  estoque INT NOT NULL,
  quantidade_total_vendida INT NOT NULL,
  lancamento CHAR(6) NOT NULL,
  foto TINYTEXT NOT NULL,
  preco INT NOT NULL,
  promocao_id CHAR(36),
  CONSTRAINT fk_promocao FOREIGN KEY (promocao_id) REFERENCES promocao(id)
);
