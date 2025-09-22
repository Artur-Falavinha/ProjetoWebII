import { SituationEnum } from "@/app/@types";
import { HistoryType } from "../misc/HistoryType";

export type OrderRequest = {
    id: number;
    client?: string;
    product: string;
    order_date: string;
    situation: SituationEnum;
    category: string;
    price: number;
    issue_description: string;
    atributed_employee?: string;
    fix_description?: string;
    orientation?: string;
    history?: HistoryType[];
  }