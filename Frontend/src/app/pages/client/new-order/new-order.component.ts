import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  SidebarComponent,
  ButtonComponent,
  NewOrderCardComponent,
} from '@/app/lib/components';
import { OrderRequest, SituationEnum } from '@/app/@types';

@Component({
  selector: 'app-new-order',
  imports: [SidebarComponent, ButtonComponent, NewOrderCardComponent],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrderComponent {
  public items: OrderRequest[] = [
    {
      id: 1,
      product: 'Solicitação Aberta',
      order_date: '2025-09-18',
      situation: SituationEnum.ABERTA,
      category: 'Categoria 1',
      price: 100.0,
      issue_description: 'Descrição da solicitação aberta.',
    },
    {
      id: 2,
      product: 'Solicitação Orcada',
      order_date: '2025-09-18',
      situation: SituationEnum.ORCADA,
      category: 'Categoria 2',
      price: 200.0,
      issue_description: 'Descrição da solicitação orçada.',
    },
    {
      id: 3,
      product: 'Solicitação Rejeitada',
      order_date: '2025-09-18',
      situation: SituationEnum.REJEITADA,
      category: 'Categoria 3',
      price: 300.0,
      issue_description: 'Descrição da solicitação rejeitada.',
    },
    {
      id: 4,
      product: 'Solicitação Aprovada',
      order_date: '2025-09-18',
      situation: SituationEnum.APROVADA,
      category: 'Categoria 4',
      price: 400.0,
      issue_description: 'Descrição da solicitação aprovada.',
    },
    {
      id: 5,
      product: 'Solicitação Redirecionada',
      order_date: '2025-09-18',
      situation: SituationEnum.REDIRECIONADA,
      category: 'Categoria 5',
      price: 500.0,
      issue_description: 'Descrição da solicitação redirecionada.',
    },
    {
      id: 6,
      product: 'Solicitação Arrumada',
      order_date: '2025-09-18',
      situation: SituationEnum.ARRUMADA,
      category: 'Categoria 6',
      price: 600.0,
      issue_description: 'Descrição da solicitação arrumada.',
    },
    {
      id: 7,
      product: 'Solicitação Paga',
      order_date: '2025-09-18',
      situation: SituationEnum.PAGA,
      category: 'Categoria 7',
      price: 700.0,
      issue_description: 'Descrição da solicitação paga.',
    },
    {
      id: 8,
      product: 'Solicitação Finalizada',
      order_date: '2025-09-18',
      situation: SituationEnum.FINALIZADA,
      category: 'Categoria 8',
      price: 800.0,
      issue_description: 'Descrição da solicitação finalizada.',
    },
  ];
}
