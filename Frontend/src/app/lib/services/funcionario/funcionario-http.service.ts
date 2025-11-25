import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { FuncionarioRequest } from '@/app/@types';
import { FUNCIONARIOS_ENDPOINT } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioHttpService {
  private BASE_URL = FUNCIONARIOS_ENDPOINT;

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  listar(): Observable<FuncionarioRequest[] | null> {
    return this.httpClient.get<FuncionarioRequest[]>(this.BASE_URL, this.httpOptions).pipe(
      map((resp: HttpResponse<FuncionarioRequest[]>) => resp.body),
      catchError(() => of(null))
    );
  }

  buscarPorId(id: number): Observable<FuncionarioRequest | null> {
    return this.httpClient.get<FuncionarioRequest>(`${this.BASE_URL}/${id}`, this.httpOptions).pipe(
      map((resp: HttpResponse<FuncionarioRequest>) => resp.body),
      catchError(() => of(null))
    );
  }

  inserir(funcionario: FuncionarioRequest): Observable<FuncionarioRequest | null> {
    return this.httpClient.post<FuncionarioRequest>(this.BASE_URL, funcionario, this.httpOptions).pipe(
      map((resp: HttpResponse<FuncionarioRequest>) => resp.body),
      catchError(() => of(null))
    );
  }

  alterar(id: number, funcionario: FuncionarioRequest): Observable<FuncionarioRequest | null> {
    return this.httpClient.put<FuncionarioRequest>(`${this.BASE_URL}/${id}`, funcionario, this.httpOptions).pipe(
      map((resp: HttpResponse<FuncionarioRequest>) => resp.body),
      catchError(() => of(null))
    );
  }

  remover(id: number): Observable<void | null> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions).pipe(
      map(() => null),
      catchError(() => of(null))
    );
  }

  buscarPorEmail(email: string): Observable<FuncionarioRequest | null> {
    return this.httpClient.get<FuncionarioRequest>(`${this.BASE_URL}/email/${email}`, this.httpOptions).pipe(
      map((resp: HttpResponse<FuncionarioRequest>) => resp.body),
      catchError(() => of(null))
    );
  }
}
