import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent, TagComponent } from '@/app/lib/components';
import { ButtonVariant, SituationEnum, OrderRequest } from '@/app/@types';
import { HistoryType } from '@/app/@types/misc/HistoryType';
import { MatIcon } from '@angular/material/icon';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-history-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatIcon],
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss'],
})
export class HistoryCardComponent {
  @Input() history!: HistoryType[];

  public get_situation_icon(situation: SituationEnum) {
    switch (situation) {
      case SituationEnum.ABERTA:
        return {
          icon: 'document_scanner',
          action: 'Solicitação criada',
        };
      case SituationEnum.PAGA:
        return { icon: 'attach_money', action: 'Pagamento realizado' };
      case SituationEnum.ORCADA:
        return { icon: 'attach_money', action: 'Orçamento realizado' };
      case SituationEnum.REJEITADA:
        return { icon: 'money_off', action: 'Orçamento rejeitado' };
      case SituationEnum.APROVADA:
        return { icon: 'chat', action: 'Orçamento aprovado' };
      case SituationEnum.REDIRECIONADA:
        return { icon: 'call_split', action: 'Manutenção redirecionada' };
      case SituationEnum.ARRUMADA:
        return { icon: 'build', action: 'Manutenção concluida' };
      case SituationEnum.FINALIZADA:
        return { icon: 'currency', action: 'Solicitação finalizada' };
      default:
        return;
    }
  }
}
