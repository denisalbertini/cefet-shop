INSERT INTO promocao (id, nome, desconto) VALUES
(UUID(), 'Black Friday', 0.2),
(UUID(), 'Liquidação de Verão', 0.1);

INSERT INTO produto (id, nome, descricao, estoque, quantidade_total_vendida, lancamento, foto, preco, promocao_id) VALUES
(
  '84490d7b-5f06-4443-b064-ef1cd76b9ced', 
  'Camiseta Sistemas', 
  'Camiseta do curso de Sistemas', 
  120, 
  450, 
  '2024-1', 
  'https://placehold.co/400x500', 
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
  'https://placehold.co/400x500', 
  12990, 
  (SELECT id FROM promocao WHERE nome = 'Black Friday')
),
(
  UUID(), 
  'Boné Turismo', 
  'Boné do cruso de Turismo', 
  60, 
  210, 
  '2024-1', 
  'https://placehold.co/400x500', 
  6090, 
  (SELECT id FROM promocao WHERE nome = 'Liquidação de Verão')
),
(
  UUID(), 
  'Caneca Física', 
  'Caneca do curso de Física', 
  0, 
  180, 
  '2023-2', 
  'https://placehold.co/400x500', 
  3090, 
  NULL
),
(
  UUID(), 
  'Jaqueta Sistemas', 
  'Jaqueta do curso de Sistemas', 
  35, 
  95, 
  '2024-1', 
  'https://placehold.co/400x500', 
  15990, 
  (SELECT id FROM promocao WHERE nome = 'Black Friday')
),
(
  UUID(), 
  'Bermuda Turismo', 
  'Bermuda do curso de Turismo', 
  90, 
  270, 
  '2024-2', 
  'https://placehold.co/400x500', 
  7990, 
  NULL
),
(
  UUID(), 
  'Pulseira Física', 
  'Pulseira do curso de Física', 
  70, 
  310, 
  '2024-1', 
  'https://placehold.co/400x500', 
  1590, 
  (SELECT id FROM promocao WHERE nome = 'Liquidação de Verão')
),
(
  UUID(), 
  'Chinelo Sistemas', 
  'Chinelo do curso de Sistemas', 
  8, 
  390, 
  '2023-2', 
  'https://placehold.co/400x500', 
  4990, 
  NULL
),
(
  UUID(), 
  'Moletom Engenharia', 
  'Moletom do curso de Engenharia', 
  65, 
  205, 
  '2024-1', 
  'https://placehold.co/400x500', 
  8990, 
  NULL
),
(
  UUID(), 
  'Broche Turismo', 
  'Broche do curso de Turismo', 
  45, 
  140, 
  '2024-2', 
  'https://placehold.co/400x500', 
  699, 
  (SELECT id FROM promocao WHERE nome = 'Black Friday')
);
