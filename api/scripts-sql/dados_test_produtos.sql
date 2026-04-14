DELETE FROM promocao;
DELETE FROM produto;

INSERT INTO promocao (id, nome, desconto) VALUES
(UUID(), 'Black Friday', 0.2),
(UUID(), 'Liquidação de Verão', 0.1);

INSERT INTO produto (id, nome, descricao, estoque, quantidade_total_vendida, lancamento, foto, preco, promocao_id) VALUES
('cdd0d7b7-e417-4f42-b76c-dc6a4506a2e3', 'Camiseta Sistemas', 'Camiseta do curso de Sistemas', 120, 450, '2024-01', 'https://placehold.co/400x500', 5990, NULL),
(UUID(), 'Calça Engenharia', 'Calça do curso de Engenharia', 80, 320, '2024-02', 'https://placehold.co/400x500', 12990, (SELECT id FROM promocao WHERE nome = 'Black Friday')),
(UUID(), 'Boné Turismo', 'Boné do cruso de Turismo', 60, 210, '2024-03', 'https://placehold.co/400x500', 6090, (SELECT id FROM promocao WHERE nome = 'Liquidação de Verão'));
