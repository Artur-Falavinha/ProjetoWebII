import { SituationEnum } from "../enums/SituationEnum";

export interface OrderPatchRequest {
  id: number,
  status: SituationEnum
}
