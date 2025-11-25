import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { OrderRequest } from '@/app/@types';
import { SOLICITACOES_ENDPOINT } from '@/app/lib/api';

const LS_CHAVE = "solicitacoes";

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  private readonly solicitacoesSubject = new BehaviorSubject<OrderRequest[]>([]);
  readonly solicitacoes$ = this.solicitacoesSubject.asObservable();
  private readonly apiUrl = SOLICITACOES_ENDPOINT;

  constructor(private http: HttpClient) {
    const cache = this.lerDoCache();
    if (cache.length) {
      this.solicitacoesSubject.next(cache);
    }
  }

  observeSolicitacoes(): Observable<OrderRequest[]> {
    return this.solicitacoes$;
  }

  sincronizar(): Observable<OrderRequest[]> {
    return this.http.get<OrderRequest[]>(this.apiUrl).pipe(
      tap((lista) => this.substituirEstado(lista)),
      catchError((erro) => {
        console.error('Não foi possível sincronizar as solicitações com o back-end.', erro);
        const fallback = this.lerDoCache();
        this.solicitacoesSubject.next(fallback);
        return of(fallback);
      })
    );
  }

  listarTodas(): OrderRequest[] {
    const atuais = this.solicitacoesSubject.getValue();
    if (atuais.length) {
      return atuais;
    }
    const fallback = this.lerDoCache();
    this.solicitacoesSubject.next(fallback);
    return fallback;
  } 

  inserir(solicitacao: Omit<OrderRequest, 'id'>): void {
    this.http.post<OrderRequest>(this.apiUrl, solicitacao).pipe(
      tap((novaSolicitacao) => {
        const atualizadas = [...this.solicitacoesSubject.getValue(), novaSolicitacao];
        this.substituirEstado(atualizadas);
      }),
      catchError((erro) => {
        console.error('Falha ao cadastrar solicitação no back-end. Utilizando armazenamento local.', erro);
        const atualizadas = this.inserirLocal(solicitacao);
        this.substituirEstado(atualizadas);
        return of(null);
      })
    ).subscribe();
  }

  buscaPorId(id: number): OrderRequest | undefined {
    const solicitacoes = this.solicitacoesSubject.getValue().length
      ? this.solicitacoesSubject.getValue()
      : this.lerDoCache();
    return solicitacoes.find(solicitacao => solicitacao.id === id);
  }
  
  atualizar(solicitacao: OrderRequest): void {       
    this.http.put<OrderRequest>(`${this.apiUrl}/${solicitacao.id}`, solicitacao).pipe(
      tap((solicitacaoAtualizada) => {
        const atualizadas = this.solicitacoesSubject.getValue().map(item =>
          item.id === solicitacaoAtualizada.id ? solicitacaoAtualizada : item
        );
        this.substituirEstado(atualizadas);
      }),
      catchError((erro) => {
        console.error('Falha ao atualizar solicitação no back-end. Persistindo alteração localmente.', erro);
        const atualizadas = this.atualizarLocal(solicitacao);
        this.substituirEstado(atualizadas);
        return of(null);
      })
    ).subscribe();
  }

  remover(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const atualizadas = this.solicitacoesSubject.getValue().filter(solicitacao => solicitacao.id !== id);
        this.substituirEstado(atualizadas);
      }),
      catchError((erro) => {
        console.error('Falha ao remover solicitação no back-end. Removendo no cache local.', erro);
        const atualizadas = this.removerLocal(id);
        this.substituirEstado(atualizadas);
        return of(null);
      })
    ).subscribe();
  }

  private lerDoCache(): OrderRequest[] {
    const solicitacoes = localStorage[LS_CHAVE];
    return solicitacoes ? JSON.parse(solicitacoes) : [];
  }

  private inserirLocal(solicitacao: Omit<OrderRequest, 'id'>): OrderRequest[] {
    const solicitacoes = this.solicitacoesSubject.getValue().length
      ? [...this.solicitacoesSubject.getValue()]
      : this.lerDoCache();
    const novoId = solicitacoes.length === 0
      ? 1
      : Math.max(...solicitacoes.map(c => c.id)) + 1;
    const novaSolicitacao: OrderRequest = { ...solicitacao, id: novoId };
    solicitacoes.push(novaSolicitacao);
    return solicitacoes;
  }

  private atualizarLocal(solicitacao: OrderRequest): OrderRequest[] {
    const solicitacoes = this.solicitacoesSubject.getValue().length
      ? [...this.solicitacoesSubject.getValue()]
      : this.lerDoCache();
    return solicitacoes.map(obj => obj.id === solicitacao.id ? solicitacao : obj);
  }

  private removerLocal(id: number): OrderRequest[] {
    const solicitacoes = this.solicitacoesSubject.getValue().length
      ? [...this.solicitacoesSubject.getValue()]
      : this.lerDoCache();
    return solicitacoes.filter(solicitacao => solicitacao.id !== id);
  }

  private substituirEstado(solicitacoes: OrderRequest[]): void {
    this.solicitacoesSubject.next(solicitacoes);
    localStorage.setItem(LS_CHAVE, JSON.stringify(solicitacoes));
  }

  efetuarOrcamento(id: number, orcamento: any): Observable<any> {
    return this.http.put<OrderRequest>(`${this.apiUrl}/${id}/orcamento`, orcamento).pipe(
      tap((solicitacaoAtualizada) => {
        const atualizadas = this.solicitacoesSubject.getValue().map(item =>
          item.id === id ? solicitacaoAtualizada as OrderRequest : item
        );
        this.substituirEstado(atualizadas);
      }),
      catchError((erro) => {
        console.error('Falha ao efetuar orçamento.', erro);
        return of(null);
      })
    );
  }

  redirecionarSolicitacao(id: number, funcionarioId: number): Observable<any> {
    return this.http.put<OrderRequest>(`${this.apiUrl}/${id}/redirect`, { funcionarioDestinoId: funcionarioId }).pipe(
      tap((solicitacaoAtualizada) => {
        const atualizadas = this.solicitacoesSubject.getValue().map(item =>
          item.id === id ? solicitacaoAtualizada as OrderRequest : item
        );
        this.substituirEstado(atualizadas);
      }),
      catchError((erro) => {
        console.error('Falha ao redirecionar solicitação.', erro);
        return of(null);
      })
    );
  }

  rejeitarSolicitacao(id: number, motivo: string): Observable<any> {
    return this.http.put<OrderRequest>(`${this.apiUrl}/${id}/reject`, { motivoRejeicao: motivo }).pipe(
      tap((solicitacaoAtualizada) => {
        const atualizadas = this.solicitacoesSubject.getValue().map(item =>
          item.id === id ? solicitacaoAtualizada as OrderRequest : item
        );
        this.substituirEstado(atualizadas);
      }),
      catchError((erro) => {
        console.error('Falha ao rejeitar solicitação.', erro);
        return of(null);
      })
    );
  }

  efetuarManutencao(id: number, manutencao: any): Observable<any> {
    return this.http.put<OrderRequest>(`${this.apiUrl}/${id}/fix`, manutencao).pipe(
      tap((solicitacaoAtualizada) => {
        const atualizadas = this.solicitacoesSubject.getValue().map(item =>
          item.id === id ? solicitacaoAtualizada as OrderRequest : item
        );
        this.substituirEstado(atualizadas);
      }),
      catchError((erro) => {
        console.error('Falha ao efetuar manutenção.', erro);
        return of(null);
      })
    );
  }

  atualizarStatus(id: number, status: any): Observable<any> {
    return this.http.patch<OrderRequest>(`${this.apiUrl}/${id}`, { status }).pipe(
      tap((solicitacaoAtualizada) => {
        const atualizadas = this.solicitacoesSubject.getValue().map(item =>
          item.id === id ? solicitacaoAtualizada as OrderRequest : item
        );
        this.substituirEstado(atualizadas);
      }),
      catchError((erro) => {
        console.error('Falha ao atualizar status.', erro);
        return of(null);
      })
    );
  }

  buscarHistorico(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}/historico`).pipe(
      catchError((erro) => {
        console.error('Falha ao buscar histórico.', erro);
        return of([]);
      })
    );
  }
}
