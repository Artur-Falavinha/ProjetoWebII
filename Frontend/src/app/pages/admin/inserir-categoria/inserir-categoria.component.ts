import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Categoria } from '@/app/shared/models/categoria.model';
import { CategoriaService } from '@/app/lib/services/categoria/categoria.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inserir-categoria',
  standalone: true,
  imports: [CommonModule, 
            FormsModule,
            RouterModule,
            MatButtonModule,
            MatInputModule,
            MatFormFieldModule
          ],
  templateUrl: './inserir-categoria.component.html',
  styleUrl: './inserir-categoria.component.scss'
})

export class InserirCategoriaComponent {
  
@Output() close = new EventEmitter<void>();
@ViewChild('formCategoria') formCategoria!: NgForm;

  categoria : Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriaService,
    private router: Router) { }

  inserir(): void {
  if (this.formCategoria.form.valid) {
    this.categoriaService.inserir(this.categoria);
    this.close.emit(); // fecha o modal
  }
}
  closeModal(): void {
    this.close.emit(); 
  }

}
