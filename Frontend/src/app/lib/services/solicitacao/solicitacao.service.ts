import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@/app/lib/services/auth/auth.service';
import { Observable, catchError, of } from 'rxjs';
import {
  OrcamentoRequest,
  OrderRequest,
  SituationEnum,
  SolicitacaoRequest,
} from '@/app/@types';
import { SOLICITACOES_ENDPOINT } from '@/app/lib/api';
import { OrderPatchRequest } from '@/app/@types/api/OrderPatchRequest';
import { HistoryType } from '@/app/@types/misc/HistoryType';

// ...existing code...

@Injectable({
  providedIn: 'root',
})
export class SolicitacaoService {
  private readonly apiUrl = 'http://localhost:8080/solicitacao';

  constructor(private http: HttpClient, private authService: AuthService) {}

  listarTodas(filtros?: {
    dataInicio?: string;
    dataFim?: string;
    status?: SituationEnum;
  }): Observable<OrderRequest[]> {
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    let params: any = {};
    if (filtros) {
      if (filtros.dataInicio) params.dataInicio = filtros.dataInicio;
      if (filtros.dataFim) params.dataFim = filtros.dataFim;
      if (filtros.status !== undefined && filtros.status !== null) params.status = filtros.status;
    }
    return this.http.get<OrderRequest[]>(this.apiUrl, { headers: bearer, params }).pipe(
      catchError((erro) => {
        console.error('Não foi possível listar as solicitações.', erro);
        return of([]);
      })
    );
  }

  inserir(
    solicitacao: Omit<SolicitacaoRequest, 'id'>
  ): Observable<SolicitacaoRequest | null> {
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log(solicitacao)
    return this.http
      .post<SolicitacaoRequest>(this.apiUrl, solicitacao, { headers: bearer })
      .pipe(
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
    return this.http
      .get<OrderRequest>(`${this.apiUrl}/${id}`, { headers: bearer })
      .pipe(
        catchError((erro) => {
          console.error('Falha ao buscar solicitação por id.', erro);
          return of(undefined);
        })
      );
  }

  buscarHistoricosPorId(id: number): Observable<HistoryType[] | undefined> {
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<HistoryType[]>(`${this.apiUrl}/${id}/historico`, { headers: bearer })
      .pipe(
        catchError((erro) => {
          console.error('Falha ao buscar historico por id.', erro);
          return of(undefined);
        })
      );
  }

  // PARA STATUS: -FINALIZADA, PAGA ou APROVADA.
  patch(patchRequest: OrderPatchRequest): Observable<OrderRequest | null> {
    if (
      ![
        SituationEnum.PAGA,
        SituationEnum.FINALIZADA,
        SituationEnum.APROVADA,
      ].includes(patchRequest.status)
    ) {
      throw new Error('Num pode esses enum carai');
    }
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .patch<OrderRequest>(
        `${this.apiUrl}/${patchRequest.id}/patch`,
        {
          status: patchRequest.status,
        },
        { headers: bearer }
      )
      .pipe(
        catchError((erro) => {
          console.error('Falha ao atualizar solicitação no back-end.', erro);
          return of(null);
        })
      );
  }

  orcar(patchRequest: OrcamentoRequest): Observable<OrderRequest | null> {
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .put<OrderRequest>(
        `${this.apiUrl}/${patchRequest.id}/orcamento`,
        {
          status: patchRequest.valor,
        },
        { headers: bearer }
      )
      .pipe(
        catchError((erro) => {
          console.error('Falha ao atualizar solicitação no back-end.', erro);
          return of(null);
        })
      );
  }

  arrumar(patchRequest: {
    id: number;
    descricaoManutencao: string;
    orientacaoCliente: string;
  }): Observable<OrderRequest | null> {
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .put<OrderRequest>(
        `${this.apiUrl}/${patchRequest.id}/fix`,
        {
          descricaoManutencao: patchRequest.descricaoManutencao,
          orientacaoCliente: patchRequest.orientacaoCliente,
        },
        { headers: bearer }
      )
      .pipe(
        catchError((erro) => {
          console.error('Falha ao atualizar solicitação no back-end.', erro);
          return of(null);
        })
      );
  }

  redirecionar(patchRequest: {
    id: number;
    funcionarioDestinoId: number;
  }): Observable<OrderRequest | null> {
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .put<OrderRequest>(
        `${this.apiUrl}/${patchRequest.id}/redirect`,
        {
          funcionarioDestinoId: patchRequest.funcionarioDestinoId,
        },
        { headers: bearer }
      )
      .pipe(
        catchError((erro) => {
          console.error('Falha ao atualizar solicitação no back-end.', erro);
          return of(null);
        })
      );
  }

  rejeitar(patchRequest: {
    id: number;
    motivoRejeicao: string;
  }): Observable<OrderRequest | null> {
    const token = this.authService.getToken();
    const bearer: HttpHeaders = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .put<OrderRequest>(
        `${this.apiUrl}/${patchRequest.id}/reject`,
        {
          motivoRejeicao: patchRequest.motivoRejeicao,
        },
        { headers: bearer }
      )
      .pipe(
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
    return this.http
      .delete<boolean>(`${this.apiUrl}/${id}`, { headers: bearer })
      .pipe(
        catchError((erro) => {
          console.error('Falha ao remover solicitação no back-end.', erro);
          return of(false);
        })
        // Se não deu erro, retorna true
        // O operador map pode ser adicionado se quiser garantir o retorno booleano
      );
  }
}
