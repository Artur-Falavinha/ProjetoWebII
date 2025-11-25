import { SituationEnum } from "@/app/@types";
import { HistoryType } from "../misc/HistoryType";

export type OrderRequest = {
  id: number; 
  client: string;
  clientEmail: string;
  product: string;
  category: string;
  issue_description: string; //descrição feita pelo cliente
  situation: SituationEnum;
  orcamentoValor?: number; 
  atributed_employee?: string;
  fix_description?: string; //descrição da manutenção, pelo funcionário
  orientation?: string; //observações feitas pelo funcionário
  history?: HistoryType[]; 
  dataCriacao?: string; //data da abertura da solicitação 
  dataResposta?: string; //data do orçamento, aprovação, pagamento
  reject_reason?: string; //motivo da rejeição do orçamento 
}