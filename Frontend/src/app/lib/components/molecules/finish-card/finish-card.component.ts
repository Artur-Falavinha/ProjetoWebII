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
import { getFormattedDate, getFormattedDateOnly, getFormattedTimeOnly } from '@/app/lib/utils/getDateFormatted';
import { AuthService } from '@/app/lib/services';


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
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService
  ) {}

  public finish() {
    const user = this.authService.getCurrentUser();
    const dataHora = getFormattedDate();
    
    this.order!.situation = SituationEnum.FINALIZADA;
    this.order!.completion_date = dataHora;

    if (!this.order!.history) {
      this.order!.history = [];
    }

    this.order!.history.push({
      action: SituationEnum.FINALIZADA,
      date: getFormattedDateOnly(),
      time: getFormattedTimeOnly(),
      description: 'Solicitação finalizada',
      employee: user?.name
    });

    this.solicitacaoService.atualizar(this.order!);

    this.snackBar.open('Solicitação Finalizada com Sucesso', 'OK', {
      duration: 5000,
      panelClass: ['snackbar-success'],
    });

    this.router.navigate(['/admin/solicitacoes']);
  }
}
