DELETE FROM usuario;
DELETE FROM disciplina_cursada;
DELETE FROM disciplina;
DELETE FROM curso;

INSERT INTO usuario (id, nome, sobrenome, matricula, email, senha, papel, saldo) VALUES 
(
  '00f614f0-b866-4406-b1f3-15fd32a04384', 
  'Funcionário', 
  'do Cefet', 
  '2222222GSIS', 
  'funcionario@cefet-rj.br', 
  'funcionario', 
  'funcionario', 
  100000
),
(
  'd4314882-012b-4b84-9626-4208f4ed8264', 
  'Aluno', 
  'do Cefet', 
  '3333333GSIS', 
  'aluno@cefet-rj.br', 
  'aluno', 
  'aluno', 
  100000
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
