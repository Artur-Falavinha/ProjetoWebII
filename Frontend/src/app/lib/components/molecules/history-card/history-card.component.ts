import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent, TagComponent } from '@/app/lib/components';
import { ButtonVariant, SituationEnum, OrderRequest } from '@/app/@types';
import { HistoryType } from '@/app/@types/misc/HistoryType';
import { MatIcon } from '@angular/material/icon';
import { Action } from 'rxjs/internal/scheduler/Action';
import { FormatDatePipe } from '@/app/lib/utils/date-time.pipe';
import { FormatDateOnlyPipe } from '@/app/lib/utils/date.pipe';
import { FormatTimeOnlyPipe } from '@/app/lib/utils/time.pipe';

@Component({
  selector: 'app-history-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatIcon,
    FormatDatePipe,
    FormatDateOnlyPipe,
    FormatTimeOnlyPipe,
  ],
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss'],
})
export class HistoryCardComponent {
  @Input() history!: HistoryType[];

  public get_situation_icon(situation: SituationEnum | string) {
    console.log(this.history);
    console.log(situation);
    const value =
      typeof situation === 'string' ? situation.toUpperCase() : situation;
    switch (value) {
      case SituationEnum.ABERTA:
      case 'ABERTA':
        return {
          icon: 'document_scanner',
          action: 'Solicitação criada',
        };
      case SituationEnum.PAGA:
      case 'PAGA':
        return { icon: 'attach_money', action: 'Pagamento realizado' };
      case SituationEnum.ORCADA:
      case 'ORCADA':
        return { icon: 'attach_money', action: 'Orçamento realizado' };
      case SituationEnum.REJEITADA:
      case 'REJEITADA':
        return { icon: 'money_off', action: 'Orçamento rejeitado' };
      case SituationEnum.APROVADA:
      case 'APROVADA':
        return { icon: 'chat', action: 'Orçamento aprovado' };
      case SituationEnum.REDIRECIONADA:
      case 'REDIRECIONADA':
        return { icon: 'call_split', action: 'Manutenção redirecionada' };
      case SituationEnum.ARRUMADA:
      case 'ARRUMADA':
        return { icon: 'build', action: 'Manutenção concluida' };
      case SituationEnum.FINALIZADA:
      case 'FINALIZADA':
        return { icon: 'check', action: 'Solicitação finalizada' };
      default:
        return;
    }
  }
}
