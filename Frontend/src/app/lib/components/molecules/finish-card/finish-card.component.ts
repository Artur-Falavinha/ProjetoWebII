import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@/app/lib/components';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { MatIcon } from '@angular/material/icon';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-finish-card',
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
    MatSnackBarModule,
  ],
  templateUrl: './finish-card.component.html',
  styleUrls: ['./finish-card.component.scss'],
})
export class FinishCardComponent {
  @Input() order?: OrderRequest;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private solicitacaoService: SolicitacaoService
  ) {}

  onSubmit() {
    this.solicitacaoService
      .patch({
        id: this.order!.id,
        status: SituationEnum.FINALIZADA,
      })
      .subscribe({
        next: (result) => {
          if (result) {
            this.snackBar.open('Orçamento finalizado com sucesso', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-success'],
            });
            this.router.navigate(['/admin/solicitacoes']);
          } else {
            this.snackBar.open('Erro ao finalizar solicitação', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-error'],
            });
          }
        },
        error: (err) => {
          this.snackBar.open(err ? err : 'Erro ao finalizar situação', 'OK', {
            duration: 5000,
            panelClass: ['snackbar-error'],
          });
        },
      });
  }
}
