import { SituationEnum } from "@/app/@types";

export type OrderRequest = {
    id: number;
    product: string;
    order_date: string;
    situation: SituationEnum;
    category: string;
    price: number;
  }