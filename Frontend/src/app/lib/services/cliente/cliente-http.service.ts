import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ClienteRequest } from '@/app/@types';
import { CLIENTES_ENDPOINT } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class ClienteHttpService {
  private BASE_URL = CLIENTES_ENDPOINT;

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  listar(): Observable<ClienteRequest[] | null> {
    return this.httpClient.get<ClienteRequest[]>(this.BASE_URL, this.httpOptions).pipe(
      map((resp: HttpResponse<ClienteRequest[]>) => resp.body),
      catchError(() => of(null))
    );
  }

  buscarPorId(id: number): Observable<ClienteRequest | null> {
    return this.httpClient.get<ClienteRequest>(`${this.BASE_URL}/${id}`, this.httpOptions).pipe(
      map((resp: HttpResponse<ClienteRequest>) => resp.body),
      catchError(() => of(null))
    );
  }

  alterar(id: number, cliente: ClienteRequest): Observable<ClienteRequest | null> {
    return this.httpClient.put<ClienteRequest>(`${this.BASE_URL}/${id}`, cliente, this.httpOptions).pipe(
      map((resp: HttpResponse<ClienteRequest>) => resp.body),
      catchError(() => of(null))
    );
  }

  remover(id: number): Observable<void | null> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${id}`, this.httpOptions).pipe(
      map(() => null),
      catchError(() => of(null))
    );
  }
}
