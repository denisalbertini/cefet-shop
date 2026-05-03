DELETE FROM produto;
DELETE FROM promocao;

INSERT INTO promocao (id, nome, desconto) VALUES
('518bb7dd-2dac-4c63-9131-d754443596c9', 'Black Friday', 0.2),
('35609774-d44b-4a95-be09-180326578f1f', 'Liquidação de Verão', 0.1);

INSERT INTO produto (id, nome, descricao, estoque, quantidade_total_vendida, lancamento, foto, preco, promocao_id) VALUES
(
  '84490d7b-5f06-4443-b064-ef1cd76b9ced', 
  'Camiseta Sistemas', 
  'Camiseta do curso de Sistemas', 
  120, 
  450, 
  '2024-1', 
  '/src/img/camiseta_sistemas.webp', 
  5990, 
  NULL
),
(
  'ecfe344b-1437-4774-a4b5-580a2dc4ae7d', 
  'Calça Engenharia', 
  'Calça do curso de Engenharia', 
  0, 
  320, 
  '2024-2', 
  '/src/img/calca_engenharia.webp', 
  12990, 
  (SELECT id FROM promocao WHERE nome = 'Black Friday')
),
(
  'f5441968-58c0-41d8-a1ae-fff78c5a94b7', 
  'Boné Turismo', 
  'Boné do cruso de Turismo', 
  60, 
  210, 
  '2024-1', 
  '/src/img/bone_turismo.webp', 
  6090, 
  (SELECT id FROM promocao WHERE nome = 'Liquidação de Verão')
);
