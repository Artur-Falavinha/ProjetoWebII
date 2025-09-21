export class Solicitacao {
    constructor(
        public id: number = 0,
        public equipamento: string = "",
        public cliente: string = "",
        public clienteEmail: string = "",
        public categoria: string = "",
        public descricaoProblema: string = "",
        public dataHora: Date = new Date(),
        public status: 'ABERTA' | 'ORCADA' | 'APROVADA' | 'FINALIZADA' = 'ABERTA',
        public valorOrcamento?: number,
        public tecnicoResponsavel?: string,
        public dataOrcamento?: Date,
        public dataAprovacao?: Date,
        public dataFinalizacao?: Date,
        public observacoes?: string
    ){        
    }
}
