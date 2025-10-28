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

  getShortDescription(descricao: string): string {
    if (!descricao) return '';
    return descricao.length > 30 ? descricao.substring(0, 30) + '...' : descricao;
  }

  public get actionButton() {
    if (!this.order) return null;

    switch (this.order.situation) {
      case SituationEnum.ORCADA:
        return {
          title: 'Aprovar/Rejeitar',
          link: `/client/quote/${this.order.id}`,
          icon: 'currency_exchange',
          variant: 'primary' as ButtonVariant
        };
      case SituationEnum.REJEITADA:
        return {
          title: 'Resgatar',
          link: `/client/reject/${this.order.id}`,
          icon: 'track_changes',
          variant: 'secondary' as ButtonVariant
        };
      case SituationEnum.ARRUMADA:
        return {
          title: 'Pagar Serviço',
          link: `/client/payment/${this.order.id}`,
          icon: 'payment',
          variant: 'primary' as ButtonVariant
        };
      case SituationEnum.APROVADA:
      default:
        return null;
    }
  }
};
