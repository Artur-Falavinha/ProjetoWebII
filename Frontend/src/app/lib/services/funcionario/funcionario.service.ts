import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { FuncionarioRequest } from '@/app/@types';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private readonly BASE_URL = 'http://localhost:8080/funcionario';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<FuncionarioRequest[]> {
    return this.http
      .get<FuncionarioRequest[]>(this.BASE_URL, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<FuncionarioRequest[]>) => {
          if (resp.status === 200) {
            return resp.body ?? [];
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          if (err.status === 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  listarAsFormOptions(): Observable<{ value: number; label: string }[]> {
    return this.http
      .get<FuncionarioRequest[]>(this.BASE_URL + '-menos-eu', this.httpOptions)
      .pipe(
        map((resp: HttpResponse<FuncionarioRequest[]>) => {
          if (resp.status === 200 && resp.body) {
            return resp.body.map((f) => ({ value: f.id, label: f.nome }));
          } else {
            return [];
          }
        }),
        catchError((err, caught) => {
          if (err.status === 404) {
            return of([]);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  buscaPorId(id: number): Observable<FuncionarioRequest | null> {
    return this.http
      .get<FuncionarioRequest>(`${this.BASE_URL}/${id}`, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<FuncionarioRequest>) => {
          if (resp.status === 200) {
            return resp.body ?? null;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => {
          if (err.status === 404) {
            return of(null);
          } else {
            return throwError(() => err);
          }
        })
      );
  }

  inserir(
    funcionario: FuncionarioRequest
  ): Observable<FuncionarioRequest | null> {
    if (!funcionario.nome || !funcionario.email || !funcionario.senha) {
      return throwError(() => ({
        status: 400,
        message: 'Nome, email e senha são obrigatórios.',
      }));
    }

    return this.http
      .post<FuncionarioRequest>(this.BASE_URL, funcionario, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<FuncionarioRequest>) => {
          if (resp.status === 201 || resp.status === 200) {
            return resp.body ?? null;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => throwError(() => err))
      );
  }

  atualizar(
    funcionario: FuncionarioRequest
  ): Observable<FuncionarioRequest | null> {
    if (!funcionario.id) {
      return throwError(() => ({
        status: 400,
        message: 'ID inválido para atualização.',
      }));
    }
    return this.http
      .put<FuncionarioRequest>(
        `${this.BASE_URL}/${funcionario.id}`,
        funcionario,
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<FuncionarioRequest>) => {
          if (resp.status == 200) {
            return resp.body ?? null;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => throwError(() => err))
      );
  }

  remover(id: number, usuarioLogadoId?: number): Observable<void> {
    // validação original: não remover a si mesmo
    if (usuarioLogadoId && usuarioLogadoId === id) {
      return throwError(() => ({
        status: 400,
        message: 'Você não pode remover a si mesmo.',
      }));
    }
    return this.http.delete(`${this.BASE_URL}/${id}`, this.httpOptions).pipe(
      map(() => {}),
      catchError((err, caught) => throwError(() => err))
    );
  }

  buscaPorEmail(email: string): Observable<FuncionarioRequest | null> {
    return this.http
      .get<FuncionarioRequest>(
        `${this.BASE_URL}/email/${email}`,
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<FuncionarioRequest>) => {
          if (resp.status === 200) {
            return resp.body ?? null;
          } else {
            return null;
          }
        }),
        catchError((err, caught) => throwError(() => err))
      );
  }
}
