import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
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
    ReactiveFormsModule,
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
  form!: FormGroup;
  erroGeral?: string;

  constructor(
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  get nomeControl(): FormControl {
    return this.form.get('nome') as FormControl;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.erroGeral = 'Preencha corretamente o formulário.';
      return;
    }

    this.categoriaService
      .inserir({
        nome: this.nomeControl.value,
      })
      .subscribe({
        next: (resp) => {
          if (resp) {
            this.close.emit();
          }
        },
        error: (err) => {
          this.erroGeral = `[${err.status}] ${err.message}`;
        },
      });
  }

  closeModal(): void {
    this.close.emit();
  }
}
