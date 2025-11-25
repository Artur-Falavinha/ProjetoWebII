import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@/app/lib/components';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { InputComponent } from '../input/input.component';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { AuthService } from '@/app/lib/services';
import { getFormattedDate, getFormattedDateOnly, getFormattedTimeOnly } from '@/app/lib/utils/getDateFormatted';

@Component({
  selector: 'app-budget-card',
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
    MatSnackBarModule,
    MatIcon,
    InputComponent,
  ],
  templateUrl: './budget-card.component.html',
  styleUrls: ['./budget-card.component.scss']
})
export class BudgetCardComponent implements OnInit {
  @Input() order?: OrderRequest;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      valor: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  public get valorControl(): FormControl {
    return this.form.get('valor') as FormControl;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.order) {
      const orcamento = { valor: this.valorControl.value };
      
      this.solicitacaoService.efetuarOrcamento(this.order.id, orcamento).subscribe({
        next: () => {
          this.snackBar.open('Orçamento Efetuado com Sucesso', 'OK', {
            duration: 5000,
            panelClass: ['snackbar-success'],
          });
          this.router.navigate(['/admin/solicitacoes']);
        },
        error: (err) => {
          this.snackBar.open('Erro ao efetuar orçamento', 'OK', {
            duration: 5000,
            panelClass: ['snackbar-error'],
          });
        }
      });
    }
  }
}