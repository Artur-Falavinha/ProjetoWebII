import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@/app/lib/components';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { MatIcon } from '@angular/material/icon';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-rescue-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    ButtonComponent,
    MatIcon,
    MatSnackBarModule,
  ],
  templateUrl: './rescue-card.component.html',
  styleUrls: ['./rescue-card.component.scss'],
})
export class RescueCardComponent {
  @Input() order?: OrderRequest;

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private snackBar: MatSnackBar
  ) {}

  public rescueService() {
    this.solicitacaoService
      .patch({
        id: this.order!.id,
        status: SituationEnum.APROVADA,
      })
      .subscribe({
        next: (result) => {
          if (result) {
            this.snackBar.open('Solicitação redirecionado com Sucesso', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-success'],
            });
            this.router.navigate(['/admin/solicitacoes']);
          } else {
            this.snackBar.open('Erro ao redirecionado Solicitação', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-error'],
            });
          }
        },
        error: (err) => {
          this.snackBar.open(
            err ? err : 'Erro ao redirecionado Solicitação',
            'OK',
            {
              duration: 5000,
              panelClass: ['snackbar-error'],
            }
          );
        },
      });
  }
}
