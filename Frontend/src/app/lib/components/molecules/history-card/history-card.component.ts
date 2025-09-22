import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { ButtonComponent, TagComponent } from '@/app/lib/components'
import { ButtonVariant, SituationEnum, OrderRequest } from '@/app/@types';
import { HistoryType } from '@/app/@types/misc/HistoryType';

@Component({
  selector: 'app-history-card',
  standalone: true,                     
  imports: [CommonModule, RouterModule, MatCardModule], 
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.scss']
})
export class HistoryCardComponent {
  @Input() history!: HistoryType[];

  public get_situation_icon(situation: SituationEnum) {
    if (!situation) return null;

    switch (situation) {
      case SituationEnum.APROVADA:
        return null;
      case SituationEnum.ARRUMADA:
        return ;
      case SituationEnum.REJEITADA:
        return {
          title: 'Resgatar',
          link: `/orders/${this.order.id}/tracking`,
          icon: 'track_changes',
          variant: 'secondary' as ButtonVariant
        };
      case SituationEnum.ORCADA:
        return 'currency'
      default:
        return {
          title: 'Visualizar',
          link: `/orders/${this.order.id}`,
          icon: 'info',
          variant: 'secondary' as ButtonVariant
        };
    }
  }
};
