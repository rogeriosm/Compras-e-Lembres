import { Medida } from './medidaEnum';

export interface Compra {
  id: number;
  preco: number;
  mercado: string;
  produto: string;
  quantidade: number;
  medida: Medida;
  checked: boolean;
}
