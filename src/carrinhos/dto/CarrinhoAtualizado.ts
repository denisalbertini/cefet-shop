export class CarrinhoAtualizado {
    public constructor(
        public readonly produtoId: string,
        public readonly subTotal: string,
        public readonly total: string
    ) {}
}
