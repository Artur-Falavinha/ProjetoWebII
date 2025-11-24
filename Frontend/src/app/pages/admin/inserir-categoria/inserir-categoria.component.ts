import { Component, ViewChild, EventEmitter, Output, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoriaRequest } from '@/app/@types';
import { CategoriaService } from '@/app/lib/services/categoria/categoria.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-inserir-categoria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './inserir-categoria.component.html',
  styleUrl: './inserir-categoria.component.scss',
})
export class InserirCategoriaComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @ViewChild('formCategoria') formCategoria!: NgForm;

  erroGeral: string | null = null;

  categoria: CategoriaRequest = { value: 0, label: '' };

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.formCategoria.invalid) {
      this.erroGeral = 'Preencha corretamente o formulário.';
      return;
    }

    this.categoriaService.inserir(this.categoria).subscribe({
      next: (resp) => {
        if (resp) {
          this.close.emit();
        }
      },
      error: (err) => {
        this.erroGeral = `[${err.status}] ${err.message}`;
      }
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}
