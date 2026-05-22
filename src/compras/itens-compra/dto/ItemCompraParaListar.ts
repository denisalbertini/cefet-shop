export class ItemCompraParaListar {
  constructor(
    readonly quantidade: number,
    readonly subtotal: string,
    readonly produtoFoto: string,
    readonly produtoNome: string,
  ) {}
}
