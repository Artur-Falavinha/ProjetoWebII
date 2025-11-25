import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaRequest } from '@/app/@types';
import { CategoriaHttpService } from './categoria-http.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private httpService: CategoriaHttpService) { }

  listarTodas(): Observable<CategoriaRequest[] | null> {
    return this.httpService.listar();
  }

  inserir(categoria: CategoriaRequest): Observable<CategoriaRequest | null> {
    return this.httpService.inserir(categoria);
  }

  buscaPorId(value: number): Observable<CategoriaRequest | null> {
    return this.httpService.buscarPorId(value);
  }
  
  atualizar(categoria: CategoriaRequest): Observable<CategoriaRequest | null> {
    return this.httpService.alterar(categoria.value, categoria);
  }

  remover(value: number): Observable<CategoriaRequest | null> {
    return this.httpService.remover(value);
  }
}
