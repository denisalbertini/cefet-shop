CREATE DATABASE IF NOT EXISTS g7_test DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE g7_test;

CREATE TABLE promocao (
  id CHAR(36) PRIMARY KEY DEFAULT UUID(),
  nome VARCHAR(100) NOT NULL,
  desconto DECIMAL(5, 2) NOT NULL
) ENGINE=MEMORY;

CREATE TABLE produto (
  id CHAR(36) PRIMARY KEY DEFAULT UUID(),
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  estoque INT NOT NULL,
  quantidade_total_vendida INT NOT NULL,
  lancamento CHAR(6) NOT NULL,
  foto VARCHAR(255) NOT NULL,
  preco INT NOT NULL,
  promocao_id CHAR(36),
  CONSTRAINT fk_promocao FOREIGN KEY (promocao_id) REFERENCES promocao(id)
) ENGINE=MEMORY;

CREATE VIEW produto_para_hidratar AS
SELECT produto.id, 
  produto.nome, 
  produto.descricao, 
  produto.estoque, 
  produto.quantidade_total_vendida AS quantidadeTotalVendida, 
  produto.lancamento, 
  produto.foto, 
  produto.preco, 
  promocao.id AS promocaoId, 
  promocao.nome AS promocaoNome, 
  promocao.desconto AS promocaoDesconto 
FROM produto LEFT JOIN promocao ON produto.promocao_id = promocao.id;

CREATE TABLE usuario (
  id CHAR(36) PRIMARY KEY DEFAULT UUID(),
  nome VARCHAR(50) NOT NULL,
  sobrenome VARCHAR(100) NOT NULL,
  matricula CHAR(11) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL, 
  papel ENUM('aluno', 'funcionario') NOT NULL, 
  saldo INT NOT NULL
) ENGINE=MEMORY;

CREATE TABLE curso (
  id CHAR(36) PRIMARY KEY DEFAULT UUID(),
  nome VARCHAR(100) NOT NULL
) ENGINE=MEMORY;

CREATE TABLE disciplina (
  id CHAR(36) PRIMARY KEY DEFAULT UUID(),
  nome VARCHAR(100) NOT NULL,
  curso_id CHAR(36) NOT NULL,
  CONSTRAINT fk_disciplina_curso FOREIGN KEY (curso_id) REFERENCES curso(id)
) ENGINE=MEMORY;

CREATE TABLE disciplina_cursada (
  id CHAR(36) PRIMARY KEY DEFAULT UUID(),
  periodo CHAR(6) NOT NULL,
  media_final DECIMAL(3, 1) NOT NULL,
  disciplina_id CHAR(36) NOT NULL,
  usuario_id CHAR(36) NOT NULL,
  CONSTRAINT fk_dc_disciplina FOREIGN KEY (disciplina_id) REFERENCES disciplina(id),
  CONSTRAINT fk_dc_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id)
) ENGINE=MEMORY;

CREATE TABLE compra (
  id CHAR(36) PRIMARY KEY DEFAULT UUID(),
  numero_compra INT NOT NULL UNIQUE,
  timestamp INT NOT NULL,
  usuario_id CHAR(36) NOT NULL,
  CONSTRAINT fk_compra_usuario FOREIGN KEY (usuario_id) REFERENCES usuario(id)
) ENGINE=MEMORY;

CREATE TABLE item (
  id CHAR(36) PRIMARY KEY DEFAULT UUID(),
  quantidade INT NOT NULL,
  produto_id CHAR(36) NOT NULL,
  compra_id CHAR(36) NOT NULL,
  CONSTRAINT fk_item_produto FOREIGN KEY (produto_id) REFERENCES produto(id),
  CONSTRAINT fk_item_compra FOREIGN KEY (compra_id) REFERENCES compra(id)
) ENGINE=MEMORY;

CREATE VIEW usuario_para_hidratar AS 
SELECT u.id, 
  u.nome, 
  u.sobrenome, 
  u.matricula, 
  u.email, 
  u.senha, 
  u.papel, 
  u.saldo, 
  c.id AS cursoId, 
  c.nome AS cursoNome, 
  d.id AS disciplinaId, 
  d.nome AS disciplinaNome, 
  dc.id AS disciplinaCursadaId, 
  dc.periodo AS disciplinaCursadaPeriodo, 
  dc.media_final AS disciplinaCursadaMediaFinal 
FROM usuario u 
LEFT JOIN disciplina_cursada dc ON u.id = dc.usuario_id 
LEFT JOIN disciplina d ON dc.disciplina_id = d.id 
LEFT JOIN curso c ON d.curso_id = c.id;
