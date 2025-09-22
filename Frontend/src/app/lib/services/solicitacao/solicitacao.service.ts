import { Injectable } from '@angular/core';
import { SolicitacaoRequest } from '@/app/@types';

const LS_CHAVE = "solicitacoes";

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  constructor() { }

  listarTodas() : SolicitacaoRequest[] {
    const solicitacoes = localStorage[LS_CHAVE];
    return solicitacoes ? JSON.parse(solicitacoes) : [];     
  } 

  inserir(solicitacao: SolicitacaoRequest): void {
    const solicitacoes = this.listarTodas();
    if (solicitacoes.length === 0) {
      solicitacao.id = 1; 
    } else {
      const maxId = Math.max(...solicitacoes.map(c => c.id));
      solicitacao.id = maxId + 1;
    }
    solicitacoes.push(solicitacao);
    localStorage.setItem(LS_CHAVE, JSON.stringify(solicitacoes));
  }

  buscaPorId(id: number): SolicitacaoRequest | undefined {
    const solicitacoes = this.listarTodas();
     return solicitacoes.find(solicitacao => solicitacao.id === id);
  }
  
  atualizar(solicitacao: SolicitacaoRequest): void {       
    const solicitacoes = this.listarTodas();
    solicitacoes.forEach((obj, index, objs) => {
      if (solicitacao.id === obj.id) {
         objs[index] = solicitacao
      }
  });

  localStorage[LS_CHAVE] = JSON.stringify(solicitacoes);
}

  remover(id: number): void {
    let solicitacoes = this.listarTodas();
    solicitacoes = solicitacoes.filter(solicitacao => solicitacao.id !== id);
    localStorage[LS_CHAVE] = JSON.stringify(solicitacoes);
  }

}
