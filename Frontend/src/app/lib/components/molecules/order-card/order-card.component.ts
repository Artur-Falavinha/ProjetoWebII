import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { ButtonComponent, TagComponent } from '@/app/lib/components'
import { ButtonVariant, SituationEnum, OrderRequest } from '@/app/@types';

@Component({
  selector: 'app-order-card',
  standalone: true,                     
  imports: [CommonModule, RouterModule, MatCardModule, ButtonComponent, TagComponent], 
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent {
  @Input() order!: OrderRequest;

  public get action() {
    if (!this.order) return null;

    switch (this.order.situation) {
      case SituationEnum.APROVADA:
        return null;
      case SituationEnum.ARRUMADA:
        return {
          title: 'Pagar serviço',
          link: `/client/payment/${this.order.id}`,
          icon: 'visibility',
          variant: 'secondary' as ButtonVariant
        };
      case SituationEnum.REJEITADA:
        return {
          title: 'Resgatar',
          link: `/orders/${this.order.id}/tracking`,
          icon: 'track_changes',
          variant: 'secondary' as ButtonVariant
        };
      case SituationEnum.ORCADA:
        return {
          title: 'Aprovar/Rejeitar',
          link: `/client/quote/${this.order.id}`,
          icon: 'currency_exchange',
          variant: 'primary' as ButtonVariant
        };
      default:
        return {
          title: 'Visualizar',
          link: `/client/view/${this.order.id}`,
          icon: 'info',
          variant: 'secondary' as ButtonVariant
        };
    }
  }
};
