import { Injectable } from '@angular/core';
import { Funcionario } from '@/app/shared/models/funcionario.model';

const LS_CHAVE = "funcionarios";

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  constructor() { }

  listarTodas() : Funcionario[] {
    const funcionarios = localStorage[LS_CHAVE];
    return funcionarios ? JSON.parse(funcionarios) : [];     
  } 

  inserir(funcionario: Funcionario): void {
    const funcionarios = this.listarTodas();
    if (funcionarios.length === 0) {
      funcionario.id = 1; 
    } else {
      const maxId = Math.max(...funcionarios.map(f => f.id));
      funcionario.id = maxId + 1;
    }
    funcionarios.push(funcionario);
    localStorage.setItem(LS_CHAVE, JSON.stringify(funcionarios));
  }

  buscaPorId(id: number): Funcionario | undefined {
    const funcionarios = this.listarTodas();
     return funcionarios.find(funcionario => funcionario.id === id);
  }
  
  atualizar(funcionario: Funcionario): void {       
    const funcionarios = this.listarTodas();
    funcionarios.forEach((obj, index, objs) => {
      if (funcionario.id === obj.id) {
         objs[index] = funcionario
      }
  });

  localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
}

  remover(id: number): void {
    let funcionarios = this.listarTodas();
    funcionarios = funcionarios.filter(funcionario => funcionario.id !== id);
    localStorage[LS_CHAVE] = JSON.stringify(funcionarios);
  }

}
