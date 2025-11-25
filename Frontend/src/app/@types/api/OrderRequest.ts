import { SituationEnum } from '@/app/@types';
import { HistoryType } from '../misc/HistoryType';

export type OrderRequest = {
  id: number;
  client: string;
  clientEmail: string;
  descricaoEquipamento: string;
  categoriaId: number;
  categoriaNome: string;
  descricaoFalha: string; //descrição feita pelo client
  situation: SituationEnum;
  orcamentoValor?: number;
  funcionario?: string;
  funcionarioEmail?: string;
  descricaoManutencao?: string; //descrição da manutenção, pelo funcionário
  orientacoesManutencao?: string; //observações feitas pelo funcionário
  dataCriacao?: string; //data da abertura da solicitação
  dataResposta?: string; //data do orçamento, aprovação, pagamento
  reject_reason?: string; //motivo da rejeição do orçamento
};
