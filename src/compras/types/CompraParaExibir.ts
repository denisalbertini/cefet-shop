import { ItemCompraParaListar } from '../itens-compra/dto/ItemCompraParaListar';

export type CompraParaExibir = {
  numeroCompra: number;
  nomeCompletoUsuario: string;
  data: string;
  total: string;
  itens: ItemCompraParaListar[];
};
