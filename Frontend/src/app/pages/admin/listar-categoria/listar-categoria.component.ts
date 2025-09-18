import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { CategoriaService } from '@/app/lib/services/categoria/categoria.service';
import { Categoria } from '@/app/shared/models/categoria.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InserirCategoriaComponent } from '../inserir-categoria/inserir-categoria.component';
import { EditarCategoriaComponent } from '../editar-categoria/editar-categoria.component';

@Component({
  selector: 'app-listar-categoria',
  standalone: true,
  imports: [MatIconModule, SidebarComponent, CommonModule, RouterModule],
  templateUrl: './listar-categoria.component.html',
  styleUrl: './listar-categoria.component.scss'
})
export class ListarCategoriaComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categorias = this.listarTodas();
  }

  listarTodas(): Categoria[] {
    return this.categoriaService.listarTodas();
  }

  abrirModalInserir(): void {
    const dialogRef = this.dialog.open(InserirCategoriaComponent, {
      width: '400px'
    });

    dialogRef.componentInstance.close.subscribe(() => dialogRef.close());

    dialogRef.afterClosed().subscribe(() => {
      this.categorias = this.listarTodas();
    });
  }

  abrirModalEditar(categoria: Categoria): void {
    const dialogRef = this.dialog.open(EditarCategoriaComponent, {
      width: '400px',
      data: categoria
    });

    dialogRef.componentInstance.close.subscribe(() => dialogRef.close());

    dialogRef.afterClosed().subscribe(() => {
      this.categorias = this.listarTodas();
    });
  }

  remover($event: any, categoria: Categoria): void {
    $event.preventDefault();
    if(confirm(`Deseja remover a categoria ${categoria.nome}?`)){
      this.categoriaService.remover(categoria.id!);
      this.categorias = this.listarTodas();
    }
  }
}
