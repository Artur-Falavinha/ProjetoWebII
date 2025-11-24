export type LoginResponse = {
  token: string;
  tipo: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    role: string;
  };
}
