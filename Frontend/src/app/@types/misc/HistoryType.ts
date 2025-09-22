import { SituationEnum } from "../enums/SituationEnum"

export type HistoryType = {
    action: SituationEnum;
    date: string;
    time: string;
    description: string;
}