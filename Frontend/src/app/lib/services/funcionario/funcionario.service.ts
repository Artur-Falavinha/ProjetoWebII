import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FuncionarioRequest } from '@/app/@types';
import { FuncionarioHttpService } from './funcionario-http.service';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  constructor(private httpService: FuncionarioHttpService) {}

  listarTodas(): Observable<FuncionarioRequest[] | null> {
    return this.httpService.listar();
  }

  buscaPorId(id: number): Observable<FuncionarioRequest | null> {
    return this.httpService.buscarPorId(id);
  }

  inserir(funcionario: FuncionarioRequest): Observable<FuncionarioRequest | null> {
    return this.httpService.inserir(funcionario);
  }

  atualizar(funcionario: FuncionarioRequest): Observable<FuncionarioRequest | null> {
    return this.httpService.alterar(funcionario.id!, funcionario);
  }

  remover(id: number): Observable<void | null> {
    return this.httpService.remover(id);
  }

  buscaPorEmail(email: string): Observable<FuncionarioRequest | null> {
    return this.httpService.buscarPorEmail(email);
  }

}
