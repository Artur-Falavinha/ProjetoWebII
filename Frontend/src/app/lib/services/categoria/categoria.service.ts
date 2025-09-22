import { Injectable } from '@angular/core';
import { CategoriaRequest } from '@/app/@types';

const LS_CHAVE = 'categorias';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor() { }

  listarTodas() : CategoriaRequest[] {
    const categorias = localStorage[LS_CHAVE];
    return categorias ? JSON.parse(categorias) : [];
  }

  inserir(categoria: CategoriaRequest): void {
    const categorias = this.listarTodas();
    if (categorias.length === 0) {
      categoria.value = 1;
    } else {
      const maxId = Math.max(...categorias.map((c) => c.value));
      categoria.value = maxId + 1;
    }
    categorias.push(categoria);
    localStorage.setItem(LS_CHAVE, JSON.stringify(categorias));
  }

  buscaPorId(value: number): CategoriaRequest | undefined {
    const categorias = this.listarTodas();
    return categorias.find((categoria) => categoria.value === value);
  }
  
  atualizar(categoria: CategoriaRequest): void {       
    const categorias = this.listarTodas();
    categorias.forEach((obj, index, objs) => {
      if (categoria.value === obj.value) {
        objs[index] = categoria;
      }
    });

    localStorage[LS_CHAVE] = JSON.stringify(categorias);
  }

  remover(value: number): void {
    let categorias = this.listarTodas();
    categorias = categorias.filter((categoria) => categoria.value !== value);
    localStorage[LS_CHAVE] = JSON.stringify(categorias);
  }
}
