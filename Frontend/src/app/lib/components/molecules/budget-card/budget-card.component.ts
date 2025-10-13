import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@/app/lib/components';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';
import { InputComponent } from '../input/input.component';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';

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
    InputComponent
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
    private solicitacaoService: SolicitacaoService
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

    //arrumar código para destinar para funcionário 
    //arrumar destino do botão
    if (this.order) {
      this.order.situation = SituationEnum.ORCADA;
      this.order.price = this.valorControl.value;

      
      this.solicitacaoService.atualizar(this.order);
    }

    this.snackBar.open('Solicitação orçada com sucesso!', 'Fechar', {
      duration: 5000,
      panelClass: ['snackbar-success'],
    });

    this.router.navigate(['/admin/solicitacoes']);
  }
}
