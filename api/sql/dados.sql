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
),
(
  '5c81a278-37e7-4d4f-959e-5f0fe3bc7264', 
  'Caneca Física', 
  'Caneca do curso de Física', 
  0, 
  180, 
  '2023-2', 
  '/src/img/caneca_fisica.webp', 
  3090, 
  NULL
),
(
  '3fe39597-8365-4556-b241-052478325498', 
  'Jaqueta Sistemas', 
  'Jaqueta do curso de Sistemas', 
  35, 
  95, 
  '2024-1', 
  '/src/img/jaqueta_sistemas.webp', 
  15990, 
  (SELECT id FROM promocao WHERE nome = 'Black Friday')
),
(
  '517ee811-d9db-41ea-933c-70abbb252ea8', 
  'Bermuda Turismo', 
  'Bermuda do curso de Turismo', 
  90, 
  270, 
  '2024-2', 
  '/src/img/bermuda_turismo.webp', 
  7990, 
  NULL
),
(
  'b560099f-0493-4876-a851-ee142c2297dc', 
  'Pulseira Física', 
  'Pulseira do curso de Física', 
  70, 
  310, 
  '2024-1', 
  '/src/img/pulseira_fisica.webp', 
  1590, 
  (SELECT id FROM promocao WHERE nome = 'Liquidação de Verão')
),
(
  'c2547a1b-f88e-4244-afd2-41ad2601628a', 
  'Chinelo Sistemas', 
  'Chinelo do curso de Sistemas', 
  8, 
  390, 
  '2023-2', 
  '/src/img/chinelo_sistemas.webp', 
  4990, 
  NULL
),
(
  '5e0fc44b-2bf6-4225-b2da-c112f9074720', 
  'Moletom Engenharia', 
  'Moletom do curso de Engenharia', 
  65, 
  205, 
  '2024-1', 
  '/src/img/moletom_engenharia.webp', 
  8990, 
  NULL
),
(
  '210f24dd-df02-412a-adbe-57dbbf99925b', 
  'Broche Turismo', 
  'Broche do curso de Turismo', 
  45, 
  140, 
  '2024-2', 
  '/src/img/broche_turismo.webp', 
  699, 
  (SELECT id FROM promocao WHERE nome = 'Black Friday')
);
