import { SituationEnum } from "@/app/@types";
import { HistoryType } from "../misc/HistoryType";

export type OrderRequest = {
  id: number;
  client: string;
  clientEmail: string;
  product: string;
  category: string;
  issue_description: string;
  situation: SituationEnum;
  price?: number;
  atributed_employee?: string;
  fix_description?: string;
  orientation?: string;
  history?: HistoryType[];
  order_date?: string;
  approval_date?: string;
  payment_date?: string;
  completion_date?: string;
  observacoes?: string;
  reject_reason?: string;
}