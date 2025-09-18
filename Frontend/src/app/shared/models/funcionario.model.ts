export class Funcionario {
    constructor(
        public id: number = 0,
        public nome: string = "",
        public email: string = "",
        public cargo: string = "",
        public telefone: string = "",
        public dataAdmissao: Date = new Date(),
        public ativo: boolean = true
    ){        
    }
}
