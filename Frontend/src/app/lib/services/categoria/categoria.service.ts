import { Injectable } from '@angular/core';
import { Categoria } from '@/app/shared/models/categoria.model';

const LS_CHAVE = "categorias";

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor() { }

  listarTodas() : Categoria[] {
    const categorias = localStorage[LS_CHAVE];
    return categorias ? JSON.parse(categorias) : [];     
  } 

  inserir(categoria: Categoria): void {
    const categorias = this.listarTodas();
    if (categorias.length === 0) {
      categoria.id = 1; 
    } else {
      const maxId = Math.max(...categorias.map(c => c.id));
      categoria.id = maxId + 1;
    }
    categorias.push(categoria);
    localStorage.setItem(LS_CHAVE, JSON.stringify(categorias));
  }

  buscaPorId(id: number): Categoria | undefined {
    const categorias = this.listarTodas();
     return categorias.find(categoria => categoria.id === id);
  }
  
  atualizar(categoria: Categoria): void {       
    const categorias = this.listarTodas();
    categorias.forEach((obj, index, objs) => {
      if (categoria.id === obj.id) {
         objs[index] = categoria
      }
  });

  localStorage[LS_CHAVE] = JSON.stringify(categorias);
}

  remover(id: number): void {
    let categorias = this.listarTodas();
    categorias = categorias.filter(categoria => categoria.id !== id);
    localStorage[LS_CHAVE] = JSON.stringify(categorias);
  }

}
