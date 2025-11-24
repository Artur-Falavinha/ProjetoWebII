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
  price?: number; 
  atributed_employee?: string;
  fix_description?: string; //descrição da manutenção, pelo funcionário
  orientation?: string; //observações feitas pelo funcionário
  history?: HistoryType[]; 
  order_date?: string; //data da abertura da solicitação 
  budge_date?: string; //data do orçamento
  approval_date?: string; //data de aprovação do orçamento, pelo usuário
  payment_date?: string; //data de pagamento, pelo usuário
  completion_date?: string; //data em que a solicitação foi finalizada
  reject_reason?: string; //motivo da rejeição do orçamento 
}