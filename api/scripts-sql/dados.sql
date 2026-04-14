INSERT INTO promocao (id, nome, desconto) VALUES
(UUID(), 'Black Friday', 0.2),
(UUID(), 'Liquidação de Verão', 0.1);

INSERT INTO produto (id, nome, descricao, estoque, quantidade_total_vendida, lancamento, foto, preco, promocao_id) VALUES
(UUID(), 'Camiseta Sistemas', 'Camiseta do curso de Sistemas', 120, 450, '2024-01', 'https://placehold.co/400x500', 5990, NULL),
(UUID(), 'Calça Engenharia', 'Calça do curso de Engenharia', 80, 320, '2024-02', 'https://placehold.co/400x500', 12990, (SELECT id FROM promocao WHERE nome = 'Black Friday')),
(UUID(), 'Boné Turismo', 'Boné do cruso de Turismo', 60, 210, '2024-03', 'https://placehold.co/400x500', 6090, (SELECT id FROM promocao WHERE nome = 'Liquidação de Verão')),
(UUID(), 'Caneca Física', 'Caneca do curso de Física', 40, 180, '2023-11', 'https://placehold.co/400x500', 3090, NULL),
(UUID(), 'Jaqueta Sistemas', 'Jaqueta do curso de Sistemas', 35, 95, '2024-02', 'https://placehold.co/400x500', 15990, (SELECT id FROM promocao WHERE nome = 'Black Friday')),
(UUID(), 'Bermuda Turismo', 'Bermuda do curso de Turismo', 90, 270, '2024-01', 'https://placehold.co/400x500', 7990, NULL),
(UUID(), 'Pulseira Física', 'Pulseira do curso de Física', 70, 310, '2024-03', 'https://placehold.co/400x500', 1590, (SELECT id FROM promocao WHERE nome = 'Liquidação de Verão')),
(UUID(), 'Chinelo Sistemas', 'Chinelo do curso de Sistemas', 110, 390, '2023-12', 'https://placehold.co/400x500', 4990, NULL),
(UUID(), 'Moletom Engenharia', 'Moletom do curso de Engenharia', 65, 205, '2024-02', 'https://placehold.co/400x500', 8990, NULL),
(UUID(), 'Broche Turismo', 'Broche do curso de Turismo', 45, 140, '2024-03', 'https://placehold.co/400x500', 699, (SELECT id FROM promocao WHERE nome = 'Black Friday'));
