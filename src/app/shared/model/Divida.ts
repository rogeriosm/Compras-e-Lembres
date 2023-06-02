export interface Divida {
  usuario_id_dono?: number;
  cpf_devedor: string;
  nome_loja: string;
  primeira_parcela_mes: string;
  quant_vezes: number;
  valor_parcela: number;
  aceita?: boolean;
}
