import { ItemParaListar } from '../../carrinhos/itens/dto/ItemParaListar';

export type CompraParaExibir = {
  numeroCompra: number;
  nomeCompletoUsuario: string;
  data: string;
  total: string;
  itens: ItemParaListar[];
};
