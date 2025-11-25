import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { CategoriaRequest } from '@/app/@types';
import { CATEGORIAS_ENDPOINT } from '../../api';

@Injectable({
  providedIn: 'root'
})
export class CategoriaHttpService {
  private BASE_URL = CATEGORIAS_ENDPOINT;

  httpOptions = {
    observe: "response" as "response",
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  listar(): Observable<CategoriaRequest[] | null> {
    return this.httpClient.get<CategoriaRequest[]>(this.BASE_URL, this.httpOptions).pipe(
      map((resp: HttpResponse<CategoriaRequest[]>) => resp.body),
      catchError((e, c) => {
        return of(null);
      })
    );
  }

  buscarPorId(id: number): Observable<CategoriaRequest | null> {
    return this.httpClient.get<CategoriaRequest>(`${this.BASE_URL}/${id}`, this.httpOptions).pipe(
      map((resp: HttpResponse<CategoriaRequest>) => resp.body),
      catchError((e, c) => {
        return of(null);
      })
    );
  }

  inserir(categoria: CategoriaRequest): Observable<CategoriaRequest | null> {
    return this.httpClient.post<CategoriaRequest>(this.BASE_URL, categoria, this.httpOptions).pipe(
      map((resp: HttpResponse<CategoriaRequest>) => resp.body),
      catchError((e, c) => {
        return of(null);
      })
    );
  }

  alterar(id: number, categoria: CategoriaRequest): Observable<CategoriaRequest | null> {
    return this.httpClient.put<CategoriaRequest>(`${this.BASE_URL}/${id}`, categoria, this.httpOptions).pipe(
      map((resp: HttpResponse<CategoriaRequest>) => resp.body),
      catchError((e, c) => {
        return of(null);
      })
    );
  }

  remover(id: number): Observable<CategoriaRequest | null> {
    return this.httpClient.delete<CategoriaRequest>(`${this.BASE_URL}/${id}`, this.httpOptions).pipe(
      map((resp: HttpResponse<CategoriaRequest>) => resp.body),
      catchError((e, c) => {
        return of(null);
      })
    );
  }
}
