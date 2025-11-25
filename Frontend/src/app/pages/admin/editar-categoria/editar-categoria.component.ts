import { Component, EventEmitter, Output, Inject, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { InputComponent } from '@/app/lib/components/molecules/input/input.component';
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
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    InputComponent,
  ],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.scss',
})
export class EditarCategoriaComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  form!: FormGroup;
  erroGeral?: string;

  constructor(
    private categoriaService: CategoriaService,
    private fb: FormBuilder,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: CategoriaRequest
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [
        this.data.nome || '',
        [Validators.required, Validators.maxLength(50)],
      ],
    });
  }

  get nomeControl(): FormControl {
    return this.form.get('nome') as FormControl;
  }

  atualizar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.erroGeral = 'Preencha corretamente o formulário.';
      return;
    }

    const categoriaAtualizada: CategoriaRequest = {
      id: (this.data as any).value,
      nome: this.nomeControl.value,
    };

    this.categoriaService.atualizar(categoriaAtualizada).subscribe({
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
