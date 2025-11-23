import { Injectable } from '@angular/core';
import { FuncionarioRequest } from '@/app/@types';

const LS_CHAVE = "funcionarios";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor() { }

  listarTodas() : FuncionarioRequest[] {
    const funcionarios = localStorage[LS_CHAVE];
    return funcionarios ? JSON.parse(funcionarios) : [];     
  } 

  /**Valida se o email já existe no sistema**/
  private emailExiste(email: string, idExcluir?: number): boolean {
    const funcionarios = this.listarTodas();
    return funcionarios.some(f => f.email === email && f.id !== idExcluir);
  }

  /**Valida se pode remover o funcionário**/
  private podeRemover(id: number, usuarioLogadoId?: number): { pode: boolean; motivo?: string } {
    const funcionarios = this.listarTodas();
    
    // Verifica se é o último funcionário
    if (funcionarios.length <= 1) {
      return { pode: false, motivo: 'Não é possível remover o último funcionário do sistema' };
    }
    
    // Verifica se está tentando remover a si mesmo
    if (usuarioLogadoId && id === usuarioLogadoId) {
      return { pode: false, motivo: 'Você não pode remover a si mesmo' };
    }
    
    return { pode: true };
  }

  inserir(funcionario: FuncionarioRequest): { sucesso: boolean; erro?: string } {
    // Valida email único
    if (this.emailExiste(funcionario.email)) {
      return { sucesso: false, erro: 'Este email já está cadastrado no sistema' };
    }

    const funcionarios = this.listarTodas();
    const isPrimeiroFuncionario = funcionarios.length === 0;

    // Validações diferentes para o primeiro funcionário
    if (isPrimeiroFuncionario) {
      // Para o primeiro funcionário, apenas nome, email e senha são obrigatórios
      if (!funcionario.nome || !funcionario.email || !funcionario.senha) {
        return { sucesso: false, erro: 'Nome, email e senha são obrigatórios para o primeiro funcionário' };
      }
      
      // Define data de admissão como data atual para o primeiro funcionário
      const hoje = new Date();
      const dia = hoje.getDate().toString().padStart(2, '0');
      const mes = (hoje.getMonth() + 1).toString().padStart(2, '0');
      const ano = hoje.getFullYear();
      funcionario.dataAdmissao = `${dia}/${mes}/${ano}`;
      
      // Define cargo padrão para o primeiro funcionário (Administrador)
      funcionario.cargo = 'Administrador';
      
    } else {
      // Para funcionários subsequentes, todos os campos são obrigatórios
      if (!funcionario.nome || !funcionario.email || !funcionario.dataNascimento || !funcionario.senha || !funcionario.cargo || !funcionario.dataAdmissao) {
        return { sucesso: false, erro: 'Todos os campos obrigatórios devem ser preenchidos' };
      }
    }

    // Gera ID para o funcionário
    if (isPrimeiroFuncionario) {
      funcionario.id = 1; 
    } else {
      const maxId = Math.max(...funcionarios.map(f => f.id));
      funcionario.id = maxId + 1;
    }
    
    funcionarios.push(funcionario);
    localStorage.setItem(LS_CHAVE, JSON.stringify(funcionarios));
    return { sucesso: true };
  }

  buscaPorId(id: number): FuncionarioRequest | undefined {
    const funcionarios = this.listarTodas();
     return funcionarios.find(funcionario => funcionario.id === id);
  }
  
  atualizar(funcionario: FuncionarioRequest): { sucesso: boolean; erro?: string } {
    // Valida email único (excluindo o próprio funcionário)
    if (this.emailExiste(funcionario.email, funcionario.id)) {
      return { sucesso: false, erro: 'Este email já está cadastrado no sistema' };
    }

    // Valida campos obrigatórios
    if (!funcionario.nome || !funcionario.email || !funcionario.dataNascimento || !funcionario.senha) {
      return { sucesso: false, erro: 'Todos os campos obrigatórios devem ser preenchidos' };
    }
       
    const funcionarios = this.listarTodas();
    funcionarios.forEach((obj, index, objs) => {
      if (funcionario.id === obj.id) {
         objs[index] = funcionario
      }
    });

    localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
    return { sucesso: true };
  }

  remover(id: number, usuarioLogadoId?: number): { sucesso: boolean; erro?: string } {
    // Valida se pode remover
    const validacao = this.podeRemover(id, usuarioLogadoId);
    if (!validacao.pode) {
      return { sucesso: false, erro: validacao.motivo };
    }

    let funcionarios = this.listarTodas();
    funcionarios = funcionarios.filter(funcionario => funcionario.id !== id);
    localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
    return { sucesso: true };
  }

  /**Busca funcionário por email para login**/
  buscaPorEmail(email: string): FuncionarioRequest | undefined {
    const funcionarios = this.listarTodas();
    return funcionarios.find(funcionario => funcionario.email === email);
  }

}
