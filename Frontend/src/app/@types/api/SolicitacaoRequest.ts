import { SituationEnum } from "@/app/@types";

export type SolicitacaoRequest = {
    id: number;
    equipamento: string;
    cliente: string;
    clienteEmail: string;
    categoria: string;
    descricaoProblema: string;
    dataHora: string; // ISO date string
    status: SituationEnum;
    valorOrcamento?: number;
    tecnicoResponsavel?: string;
    dataOrcamento?: string; // ISO date string
    dataAprovacao?: string; // ISO date string
    dataFinalizacao?: string; // ISO date string
    observacoes?: string;
}
