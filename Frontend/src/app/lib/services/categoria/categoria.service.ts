import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { CategoriaRequest } from '@/app/@types';
import { CategoriaResponse } from '@/app/@types/api/CategoriaResponse';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly BASE_URL = 'http://localhost:8080/categoria';

  httpOptions = {
    observe: 'response' as 'response',
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<CategoriaResponse[]> {
    return this.http
      .get<CategoriaResponse[]>(this.BASE_URL, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<CategoriaResponse[]>) => {
          if (resp.status === 200) {
            return resp.body ?? [];
          }
          return [];
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of([]); // nenhum registro encontrado
          }
          return throwError(() => err);
        })
      );
  }

  buscaPorId(value: number): Observable<CategoriaResponse | null> {
    return this.http
      .get<CategoriaResponse>(`${this.BASE_URL}/${value}`, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<CategoriaResponse>) => {
          if (resp.status === 200) {
            return resp.body ?? null;
          }
          return null;
        }),
        catchError((err) => {
          if (err.status === 404) {
            return of(null);
          }
          return throwError(() => err);
        })
      );
  }

  inserir(categoria: CategoriaRequest): Observable<CategoriaRequest | null> {
    if (!categoria.nome) {
      return throwError(() => ({
        status: 400,
        message: 'Nome da categoria é obrigatório.',
      }));
    }

    return this.http
      .post<CategoriaRequest>(this.BASE_URL, categoria, this.httpOptions)
      .pipe(
        map((resp: HttpResponse<CategoriaRequest>) => {
          if (resp.status === 201 || resp.status === 200) {
            return resp.body ?? null;
          }
          return null;
        }),
        catchError((err) => throwError(() => err))
      );
  }

  atualizar(categoria: CategoriaRequest): Observable<CategoriaRequest | null> {
    if (!categoria.id) {
      return throwError(() => ({
        status: 400,
        message: 'ID inválido para atualização.',
      }));
    }

    return this.http
      .put<CategoriaRequest>(
        `${this.BASE_URL}/${categoria.id}`,
        categoria,
        this.httpOptions
      )
      .pipe(
        map((resp: HttpResponse<CategoriaRequest>) => {
          if (resp.status === 200) {
            return resp.body ?? null;
          }
          return null;
        }),
        catchError((err) => throwError(() => err))
      );
  }

  remover(value: number): Observable<void> {
    return this.http.delete(`${this.BASE_URL}/${value}`, this.httpOptions).pipe(
      map(() => {}),
      catchError((err) => throwError(() => err))
    );
  }
}
