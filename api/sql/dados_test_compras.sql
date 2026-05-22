DELETE FROM produto;
DELETE FROM usuario;
DELETE FROM compra;
DELETE FROM item_compra;

INSERT INTO produto (id, nome, descricao, estoque, quantidade_total_vendida, lancamento, foto, preco, promocao_id) VALUES
(
  '1886d640-b904-48a5-bb1b-9ca97a1fa773',
  'produto',
  'descricao',
  5,
  100,
  '2024-1',
  'url',
  1000,
  NULL
),
(
  'ee1dc0d7-4f42-4c4b-83c7-8df5ffe25706',
  'produto',
  'descricao',
  0,
  100,
  '2024-1',
  'url',
  1000,
  NULL
),
(
  '1aa818b4-c423-4fda-84a9-14a28fa0a93d',
  'produto',
  'descricao',
  15,
  100,
  '2024-1',
  'url',
  1000,
  NULL
);

INSERT INTO usuario (id, nome, sobrenome, matricula, email, senha, papel, saldo) VALUES 
(
  'd4314882-012b-4b84-9626-4208f4ed8264', 
  'Aluno', 
  'do Cefet', 
  '3333333GSIS', 
  'aluno@cefet-rj.br', 
  'aluno', 
  'aluno', 
  0
),
(
  '3f44131b-867f-4ff5-973b-b80cc85520d9', 
  'Aluno', 
  'do Cefet', 
  '4444444GSIS', 
  'aluno2@cefet-rj.br', 
  'aluno', 
  'aluno', 
  100000
);
