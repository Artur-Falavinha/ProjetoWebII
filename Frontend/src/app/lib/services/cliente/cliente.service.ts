import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteRequest } from '@/app/@types';
import { ClienteHttpService } from './cliente-http.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private httpService: ClienteHttpService) {}

  listarTodos(): Observable<ClienteRequest[] | null> {
    return this.httpService.listar();
  }

  buscaPorId(id: number): Observable<ClienteRequest | null> {
    return this.httpService.buscarPorId(id);
  }

  atualizar(id: number, cliente: ClienteRequest): Observable<ClienteRequest | null> {
    return this.httpService.alterar(id, cliente);
  }

  remover(id: number): Observable<void | null> {
    return this.httpService.remover(id);
  }
}
