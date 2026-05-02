export class ProdutoParaDetalhar {
    public constructor(
        public readonly id: string,
        public readonly foto: string,
        public readonly nome: string,
        public readonly lancamento: string,
        public readonly descricao: string,
        public readonly preco: string,
        public readonly precoPromocional: string | null,
        public readonly estoque: number
    ) {}
}
