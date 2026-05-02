export class ProdutoParaListar {
  public constructor(
    public readonly id: string,
    public readonly foto: string,
    public readonly nome: string,
    public readonly preco: string,
    public readonly precoPromocional: string | null,
  ) {}
}
