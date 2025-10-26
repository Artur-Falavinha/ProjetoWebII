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
  selector: 'app-approve-card',
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
  templateUrl: './approve-card.component.html',
  styleUrls: ['./approve-card.component.scss'],
})
export class ApproveCardComponent {
  @Input() order?: OrderRequest;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private solicitacaoService: SolicitacaoService
  ) {}

  public approve() {
    this.order!.situation = SituationEnum.APROVADA;

    this.solicitacaoService.atualizar(this.order!);

    this.snackBar.open(
      `Serviço aprovado no valor de R$ ${this.order?.price}`, // mensagem
      'Fechar', 
      {
        duration: 5000,
        panelClass: ['snackbar-success'],
      }
    );

    this.router.navigate(['/client']);
  }
}
