import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { FuncionarioRequest } from '@/app/@types';
import { FuncionarioResponse } from '@/app/@types/api/FuncionarioResponse';
import { AuthService } from '../auth/auth.service';

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

  constructor(private http: HttpClient, private auth: AuthService) {}

  listarTodas(): Observable<FuncionarioResponse[]> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<FuncionarioResponse[]>('http://localhost:8080/funcionario-menos-eu', { headers, observe: 'response' })
      .pipe(
        map((resp: HttpResponse<FuncionarioResponse[]>) => {
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
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<FuncionarioResponse[]>(this.BASE_URL + '-menos-eu', { headers, observe: 'response' })
      .pipe(
        map((resp: HttpResponse<FuncionarioResponse[]>) => {
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

  buscaPorId(id: number): Observable<FuncionarioResponse | null> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<FuncionarioResponse>(`${this.BASE_URL}/${id}`, { headers, observe: 'response' })
      .pipe(
        map((resp: HttpResponse<FuncionarioResponse>) => {
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
    console.log(funcionario)
    if (!funcionario.nome || !funcionario.email || !funcionario.senha) {
      return throwError(() => ({
        status: 400,
        message: 'Nome, email e senha são obrigatórios.',
      }));
    }
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .post<FuncionarioRequest>(this.BASE_URL, funcionario, { headers, observe: 'response' })
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
    id: number,
    funcionario: FuncionarioRequest
  ): Observable<FuncionarioRequest | null> {
    if (!id) {
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
      .put<FuncionarioRequest>(
        `${this.BASE_URL}/${id}`,
        funcionario,
        { headers, observe: 'response' }
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

  remover(id: number): Observable<void> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.BASE_URL}/${id}`, { headers, observe: 'response' }).pipe(
      map(() => {}),
      catchError((err, caught) => throwError(() => err))
    );
  }

  buscaPorEmail(email: string): Observable<FuncionarioRequest | null> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http
      .get<FuncionarioRequest>(
        `${this.BASE_URL}/email/${email}`,
        { headers, observe: 'response' }
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
