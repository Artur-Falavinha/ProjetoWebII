
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { CategoriaRequest } from '@/app/@types';
import { CategoriaResponse } from '@/app/@types/api/CategoriaResponse';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private readonly BASE_URL = 'http://localhost:8080/categoria';

  constructor(private http: HttpClient, private auth: AuthService) {}

  listarTodas(): Observable<CategoriaResponse[]> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<CategoriaResponse[]>(this.BASE_URL, { headers, observe: 'response' })
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
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<CategoriaResponse>(`${this.BASE_URL}/${value}`, { headers, observe: 'response' })
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
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<CategoriaRequest>(this.BASE_URL, categoria, { headers, observe: 'response' })
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
    console.log(categoria)
    if (!categoria.id) {
      return throwError(() => ({
        status: 400,
        message: 'ID inválido para atualização.',
      }));
    }
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .put<CategoriaRequest>(
        `${this.BASE_URL}/${categoria.id}`,
        categoria,
        { headers, observe: 'response' }
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
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.BASE_URL}/${value}`, { headers, observe: 'response' }).pipe(
      map(() => {}),
      catchError((err) => throwError(() => err))
    );
  }
}
