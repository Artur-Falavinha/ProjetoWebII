export type FuncionarioRequest = {
    id: number;
    nome: string;
    email: string;
    dataNascimento: string; // ISO date string
    senha: string;
    cargo: string;
    telefone: string;
    dataAdmissao: string; // ISO date string
    ativo: boolean;
}
