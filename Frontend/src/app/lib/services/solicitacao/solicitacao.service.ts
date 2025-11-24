import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@/app/lib/services/auth/auth.service';
import { Observable, catchError, of } from 'rxjs';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { SOLICITACOES_ENDPOINT } from '@/app/lib/api';
import { OrderPatchRequest } from '@/app/@types/api/OrderPatchRequest';

// ...existing code...

@Injectable({
  providedIn: 'root',
})
export class SolicitacaoService {
  private readonly apiUrl = SOLICITACOES_ENDPOINT;

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Remove observeSolicitacoes, pois não há mais estado local

  listarTodas(): Observable<OrderRequest[]> {
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<OrderRequest[]>(this.apiUrl, { headers: bearer }).pipe(
      catchError((erro) => {
        console.error('Não foi possível listar as solicitações.', erro);
        return of([]);
      })
    );
  }

  inserir(solicitacao: Omit<OrderRequest, 'id'>): Observable<OrderRequest | null> {
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<OrderRequest>(this.apiUrl, solicitacao, { headers: bearer }).pipe(
      catchError((erro) => {
        console.error('Falha ao cadastrar solicitação no back-end.', erro);
        return of(null);
      })
    );
  }

  buscaPorId(id: number): Observable<OrderRequest | undefined> {
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<OrderRequest>(`${this.apiUrl}/${id}`, { headers: bearer }).pipe(
      catchError((erro) => {
        console.error('Falha ao buscar solicitação por id.', erro);
        return of(undefined);
      })
    );
  }

  // PARA STATUS: -FINALIZADA, PAGA ou APROVADA.
  patch(patchRequest: OrderPatchRequest): Observable<OrderRequest | null> {
    if (![
      SituationEnum.PAGA,
      SituationEnum.FINALIZADA,
      SituationEnum.APROVADA,
    ].includes(patchRequest.status)) {
      throw new Error('Num pode esses enum carai');
    }
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch<OrderRequest>(`${this.apiUrl}/${patchRequest.id}/patch`, {
      status: patchRequest.status,
    }, { headers: bearer }).pipe(
      catchError((erro) => {
        console.error('Falha ao atualizar solicitação no back-end.', erro);
        return of(null);
      })
    );
  }

  remover(id: number): Observable<boolean> {
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`, { headers: bearer }).pipe(
      catchError((erro) => {
        console.error('Falha ao remover solicitação no back-end.', erro);
        return of(false);
      }),
      // Se não deu erro, retorna true
      // O operador map pode ser adicionado se quiser garantir o retorno booleano
    );
  }

  // Métodos de cache removidos
}
