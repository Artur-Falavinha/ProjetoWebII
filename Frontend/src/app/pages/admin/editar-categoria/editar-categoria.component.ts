import { Component, ViewChild, EventEmitter, Output, Input, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriaRequest } from '@/app/@types';
import { CategoriaService } from '@/app/lib/services/categoria/categoria.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

  @Component({
    selector: 'app-editar-categoria',
    standalone: true,
    imports: [
      CommonModule,
      FormsModule,
      RouterModule,
      MatButtonModule,
      MatInputModule,
      MatFormFieldModule
    ],
    templateUrl: './editar-categoria.component.html',
    styleUrl: './editar-categoria.component.scss'
  })

export class EditarCategoriaComponent {

  @Output() close = new EventEmitter<void>();
  @ViewChild('formCategoria') formCategoria!: NgForm;
  categoria: CategoriaRequest;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaRequest 
  ) {
    this.categoria = { ...data };
  }

  atualizar(): void {
    if (this.formCategoria.form.valid) {
      this.categoriaService.atualizar(this.categoria).subscribe(() => {
        this.close.emit();
      });
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
