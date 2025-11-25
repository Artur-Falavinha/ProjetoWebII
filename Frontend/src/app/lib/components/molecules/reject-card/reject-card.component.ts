import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@/app/lib/components';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { TextAreaInputComponent } from '../text-area-input/text-area-input.component';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { MatIcon } from '@angular/material/icon';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reject-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    ButtonComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatIcon,
    TextAreaInputComponent,
  ],
  templateUrl: './reject-card.component.html',
  styleUrls: ['./reject-card.component.scss'],
})
export class RejectCardComponent implements OnInit {
  rejectForm!: FormGroup;

  @Input() order?: OrderRequest;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.rejectForm = this.fb.group({
      reject_reason: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  public get reject_reasonControl() {
    return this.rejectForm.get('reject_reason') as FormControl;
  }

  onSubmit(): void {
    if (this.rejectForm.invalid) {
      this.rejectForm.markAllAsTouched();
      return;
    }

    this.solicitacaoService
      .rejeitar({
        id: this.order!.id,
        motivoRejeicao: this.reject_reasonControl.value,
      })
      .subscribe({
        next: (result) => {
          if (result) {
            this.snackBar.open('Orçamento rejeitado com sucesso', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-success'],
            });
            this.router.navigate(['/admin/solicitacoes']);
          } else {
            this.snackBar.open('Erro ao rejeitar orçamento', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-error'],
            });
          }
        },
        error: (err) => {
          this.snackBar.open(err ? err : 'Erro ao rejeitar orçamento', 'OK', {
            duration: 5000,
            panelClass: ['snackbar-error'],
          });
        },
      });
  }
}
