import { SituationEnum } from "../enums/SituationEnum";

export type HistoryType = {
    id: number;
    solicitacaoId: number;
    comentario: string;
    dataCriacao: string;
    funcionarioId: number | null;
    funcionarioNome: string | null;
    funcionarioAnteriorId: number | null;
    funcionarioAnteriorNome: string | null;
    motivoRejeicao: string | null;
    status: SituationEnum;
}