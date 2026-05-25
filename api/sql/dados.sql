USE g7_prod;

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

INSERT INTO usuario (id, nome, sobrenome, matricula, email, senha, papel, saldo) VALUES 
(
  'd4314882-012b-4b84-9626-4208f4ed8264', 
  'Aluno', 
  'do Cefet', 
  '1111111GSIS', 
  'aluno@cefet-rj.br', 
  '$argon2id$v=19$m=65536,t=4,p=1$UVZ0SURZd0lPRkg0SUdFaA$IIrRCT+vCvGzM/27nqNwGRagl46XIo+JdcVH3uzChtQ', 
  'aluno', 
  100000000
),
(
  '00f614f0-b866-4406-b1f3-15fd32a04384', 
  'Funcionário', 
  'do Cefet', 
  '2222222GSIS', 
  'funcionario@cefet-rj.br', 
  '$argon2id$v=19$m=65536,t=4,p=1$Y09VdllnUEpvOHN4eW43Yg$pfgf2msCuEQ7Ol8KNAwXiFVA4OEjOQvy8zkAxAsU6tA', 
  'funcionario', 
  0
);

INSERT INTO curso (id, nome) VALUES 
('97f83e00-3c3b-4e68-be33-3e66e42af808', 'Sistemas de Informação');

INSERT INTO disciplina (id, nome, curso_id) VALUES 
(
  'e7d85f0b-2a1c-4f6c-8a7f-163f47f46325', 
  'Programação para a Web', 
  '97f83e00-3c3b-4e68-be33-3e66e42af808'
),
(
  'd3d1928c-93d7-4300-83b7-fd4d52052f43', 
  'Programação de Clientes Web', 
  '97f83e00-3c3b-4e68-be33-3e66e42af808'
),
(
  '6dd10dd1-78a1-4674-a1ad-1f6c3ee11849', 
  'Projeto Integrador de Sistemas', 
  '97f83e00-3c3b-4e68-be33-3e66e42af808'
);

INSERT INTO disciplina_cursada (id, periodo, media_final, disciplina_id, usuario_id) VALUES 
(
  '574054e5-901c-42aa-bdd7-6681ea2c190f', 
  '2025-1', 
  8.0, 
  'e7d85f0b-2a1c-4f6c-8a7f-163f47f46325', 
  'd4314882-012b-4b84-9626-4208f4ed8264'
),
(
  '5a6f2fe3-0ccd-42a3-a81e-c181bb9bbbd0', 
  '2025-2', 
  9.0, 
  'd3d1928c-93d7-4300-83b7-fd4d52052f43', 
  'd4314882-012b-4b84-9626-4208f4ed8264'
),
(
  '914b57a3-1a1a-4895-9e56-e5cc95cb8d76', 
  '2026-1', 
  10.0, 
  '6dd10dd1-78a1-4674-a1ad-1f6c3ee11849', 
  'd4314882-012b-4b84-9626-4208f4ed8264'
);

INSERT INTO compra (id, numero_compra, timestamp, total, usuario_id) VALUES 
(
  '9e8195ca-d190-46ac-8b24-cb49703e017b', 
  1777939200, 
  1777939200, 
  31970, 
  'd4314882-012b-4b84-9626-4208f4ed8264'
), 
(
  '42acb306-9702-4574-81a0-d6855cfeb290', 
  1778352000, 
  1778352000, 
  21450, 
  'd4314882-012b-4b84-9626-4208f4ed8264'
);

INSERT INTO item_compra (id, quantidade, subtotal, produto_id, compra_id) VALUES 
(
  '77916fb1-272a-4ed4-b669-ef0a5d503290', 
  1, 
  5990, 
  '84490d7b-5f06-4443-b064-ef1cd76b9ced', 
  '9e8195ca-d190-46ac-8b24-cb49703e017b'
), 
(
  'efd5a703-6743-4b3f-aaa8-e76722aeb665', 
  2, 
  25980, 
  'ecfe344b-1437-4774-a4b5-580a2dc4ae7d', 
  '9e8195ca-d190-46ac-8b24-cb49703e017b'
), 
(
  'c65cd02e-5eaf-4004-a379-66501c74c4b1', 
  2, 
  12180, 
  'f5441968-58c0-41d8-a1ae-fff78c5a94b7', 
  '42acb306-9702-4574-81a0-d6855cfeb290'
), 
(
  '495e8079-3f65-4aef-9754-ec4f55c32bc4', 
  3, 
  9270, 
  '5c81a278-37e7-4d4f-959e-5f0fe3bc7264', 
  '42acb306-9702-4574-81a0-d6855cfeb290'
);

INSERT INTO compra (id, numero_compra, timestamp, total, usuario_id) VALUES
('b8a1c001-0001-4f3f-a111-000000000001', 1770010001, 1770010001, 17980, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0002-4f3f-a111-000000000002', 1770096400, 1770096400, 30970, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0003-4f3f-a111-000000000003', 1770182800, 1770182800, 7990, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0004-4f3f-a111-000000000004', 1770269200, 1770269200, 19980, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0005-4f3f-a111-000000000005', 1770355600, 1770355600, 13980, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0006-4f3f-a111-000000000006', 1770442000, 1770442000, 6090, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0007-4f3f-a111-000000000007', 1770528400, 1770528400, 48970, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0008-4f3f-a111-000000000008', 1770614800, 1770614800, 9990, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0009-4f3f-a111-000000000009', 1770701200, 1770701200, 21450, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0010-4f3f-a111-000000000010', 1770787600, 1770787600, 15990, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0011-4f3f-a111-000000000011', 1770874000, 1770874000, 12180, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0012-4f3f-a111-000000000012', 1770960400, 1770960400, 6990, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0013-4f3f-a111-000000000013', 1771046800, 1771046800, 18970, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0014-4f3f-a111-000000000014', 1771133200, 1771133200, 6090, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0015-4f3f-a111-000000000015', 1771219600, 1771219600, 45970, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0016-4f3f-a111-000000000016', 1771306000, 1771306000, 9990, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0017-4f3f-a111-000000000017', 1771392400, 1771392400, 3090, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0018-4f3f-a111-000000000018', 1771478800, 1771478800, 12990, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0019-4f3f-a111-000000000019', 1771565200, 1771565200, 15180, 'd4314882-012b-4b84-9626-4208f4ed8264'),
('b8a1c001-0020-4f3f-a111-000000000020', 1771651600, 1771651600, 27960, 'd4314882-012b-4b84-9626-4208f4ed8264');

INSERT INTO item_compra (id, quantidade, subtotal, produto_id, compra_id) VALUES
('c9a10001-1111-4f3f-a111-000000000001', 2, 11980, '84490d7b-5f06-4443-b064-ef1cd76b9ced', 'b8a1c001-0001-4f3f-a111-000000000001'),
('c9a10001-1112-4f3f-a111-000000000002', 1, 5990, '210f24dd-df02-412a-adbe-57dbbf99925b', 'b8a1c001-0001-4f3f-a111-000000000001'),

('c9a10001-1113-4f3f-a111-000000000003', 1, 15990, '3fe39597-8365-4556-b241-052478325498', 'b8a1c001-0002-4f3f-a111-000000000002'),
('c9a10001-1114-4f3f-a111-000000000004', 1, 14980, 'c2547a1b-f88e-4244-afd2-41ad2601628a', 'b8a1c001-0002-4f3f-a111-000000000002'),

('c9a10001-1115-4f3f-a111-000000000005', 1, 7990, '517ee811-d9db-41ea-933c-70abbb252ea8', 'b8a1c001-0003-4f3f-a111-000000000003'),

('c9a10001-1116-4f3f-a111-000000000006', 4, 19960, 'b560099f-0493-4876-a851-ee142c2297dc', 'b8a1c001-0004-4f3f-a111-000000000004'),

('c9a10001-1117-4f3f-a111-000000000007', 2, 13980, '210f24dd-df02-412a-adbe-57dbbf99925b', 'b8a1c001-0005-4f3f-a111-000000000005'),

('c9a10001-1118-4f3f-a111-000000000008', 1, 6090, 'f5441968-58c0-41d8-a1ae-fff78c5a94b7', 'b8a1c001-0006-4f3f-a111-000000000006'),

('c9a10001-1119-4f3f-a111-000000000009', 3, 17970, '84490d7b-5f06-4443-b064-ef1cd76b9ced', 'b8a1c001-0007-4f3f-a111-000000000007'),
('c9a10001-1120-4f3f-a111-000000000010', 1, 3090, '5c81a278-37e7-4d4f-959e-5f0fe3bc7264', 'b8a1c001-0007-4f3f-a111-000000000007'),
('c9a10001-1121-4f3f-a111-000000000011', 1, 27910, '5e0fc44b-2bf6-4225-b2da-c112f9074720', 'b8a1c001-0007-4f3f-a111-000000000007'),

('c9a10001-1122-4f3f-a111-000000000012', 2, 9980, 'c2547a1b-f88e-4244-afd2-41ad2601628a', 'b8a1c001-0008-4f3f-a111-000000000008'),

('c9a10001-1123-4f3f-a111-000000000013', 2, 12180, 'f5441968-58c0-41d8-a1ae-fff78c5a94b7', 'b8a1c001-0009-4f3f-a111-000000000009'),
('c9a10001-1124-4f3f-a111-000000000014', 3, 9270, '5c81a278-37e7-4d4f-959e-5f0fe3bc7264', 'b8a1c001-0009-4f3f-a111-000000000009'),

('c9a10001-1125-4f3f-a111-000000000015', 1, 15990, '3fe39597-8365-4556-b241-052478325498', 'b8a1c001-0010-4f3f-a111-000000000010'),

('c9a10001-1126-4f3f-a111-000000000016', 2, 12180, 'f5441968-58c0-41d8-a1ae-fff78c5a94b7', 'b8a1c001-0011-4f3f-a111-000000000011'),

('c9a10001-1127-4f3f-a111-000000000017', 10, 6990, '210f24dd-df02-412a-adbe-57dbbf99925b', 'b8a1c001-0012-4f3f-a111-000000000012'),

('c9a10001-1128-4f3f-a111-000000000018', 3, 17970, '84490d7b-5f06-4443-b064-ef1cd76b9ced', 'b8a1c001-0013-4f3f-a111-000000000013'),
('c9a10001-1129-4f3f-a111-000000000019', 1, 1000, '210f24dd-df02-412a-adbe-57dbbf99925b', 'b8a1c001-0013-4f3f-a111-000000000013'),

('c9a10001-1130-4f3f-a111-000000000020', 1, 6090, 'f5441968-58c0-41d8-a1ae-fff78c5a94b7', 'b8a1c001-0014-4f3f-a111-000000000014'),

('c9a10001-1131-4f3f-a111-000000000021', 5, 29950, '84490d7b-5f06-4443-b064-ef1cd76b9ced', 'b8a1c001-0015-4f3f-a111-000000000015'),
('c9a10001-1132-4f3f-a111-000000000022', 1, 16020, '5e0fc44b-2bf6-4225-b2da-c112f9074720', 'b8a1c001-0015-4f3f-a111-000000000015'),

('c9a10001-1133-4f3f-a111-000000000023', 2, 9980, 'c2547a1b-f88e-4244-afd2-41ad2601628a', 'b8a1c001-0016-4f3f-a111-000000000016'),

('c9a10001-1134-4f3f-a111-000000000024', 1, 3090, '5c81a278-37e7-4d4f-959e-5f0fe3bc7264', 'b8a1c001-0017-4f3f-a111-000000000017'),

('c9a10001-1138-4f3f-a111-000000000028', 4, 27960, '517ee811-d9db-41ea-933c-70abbb252ea8', 'b8a1c001-0020-4f3f-a111-000000000020');
