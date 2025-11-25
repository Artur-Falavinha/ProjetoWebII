import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@/app/lib/components';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { MatIcon } from '@angular/material/icon';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { getFormattedDateOnly, getFormattedTimeOnly } from '@/app/lib/utils/getDateFormatted';

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
    this.solicitacaoService.atualizarStatus(this.order!.id, SituationEnum.APROVADA).subscribe({
      next: () => {
        this.snackBar.open('Serviço Resgatado com Sucesso', 'OK', {
          duration: 5000,
          panelClass: ['snackbar-success'],
        });
        this.router.navigate(['/client']);
      },
      error: (err) => {
        this.snackBar.open('Erro ao resgatar serviço', 'OK', {
          duration: 5000,
          panelClass: ['snackbar-error'],
        });
      }
    });
  }
}
