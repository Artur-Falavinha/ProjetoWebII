import { Injectable } from '@angular/core';
import { OrderRequest } from '@/app/@types';

const LS_CHAVE = "solicitacoes";

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  constructor() { }

  listarTodas() : OrderRequest[] {
    const solicitacoes = localStorage[LS_CHAVE];
    return solicitacoes ? JSON.parse(solicitacoes) : [];     
  } 

  inserir(solicitacao: Omit<OrderRequest, 'id'>): void {
    const solicitacoes = this.listarTodas();
    const novoId = solicitacoes.length === 0
      ? 1
      : Math.max(...solicitacoes.map(c => c.id)) + 1;
    const novaSolicitacao: OrderRequest = { ...solicitacao, id: novoId };
    solicitacoes.push(novaSolicitacao);
    localStorage.setItem(LS_CHAVE, JSON.stringify(solicitacoes));
  }

  buscaPorId(id: number): OrderRequest | undefined {
    const solicitacoes = this.listarTodas();
     return solicitacoes.find(solicitacao => solicitacao.id === id);
  }
  
  atualizar(solicitacao: OrderRequest): void {       
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
