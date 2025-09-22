import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent, ButtonComponent, OrderCardComponent } from '@/app/lib/components';
import { OrderRequest, SituationEnum } from '@/app/@types';

@Component({
  selector: 'app-client',
  imports: [SidebarComponent, ButtonComponent, OrderCardComponent],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientHomeComponent {
  public items: OrderRequest[] = [
    {
      id: 1,
      client: 'zé',
      product: 'Solicitação Aberta',
      order_date: '18/09/2025',
      situation: SituationEnum.ABERTA,
      category: 'Categoria 1',
      price: 100.0,
      issue_description: 'Descrição da solicitação aberta.',
      atributed_employee: 'zé',
    },
    {
      id: 2,
      client: 'zé',
      product: 'Solicitação Orcada',
      order_date: '18/09/2025',
      situation: SituationEnum.ORCADA,
      category: 'Categoria 2',
      price: 200.0,
      issue_description: 'Descrição da solicitação orçada.',
      atributed_employee: 'zé',
    },
    {
      id: 3,
      client: 'zé',
      product: 'Solicitação Rejeitada',
      order_date: '18/09/2025',
      situation: SituationEnum.REJEITADA,
      category: 'Categoria 3',
      price: 300.0,
      issue_description: 'Descrição da solicitação rejeitada.',
    },
    {
      id: 4,
      client: 'zé',
      product: 'Solicitação Aprovada',
      order_date: '18/09/2025',
      situation: SituationEnum.APROVADA,
      category: 'Categoria 4',
      price: 400.0,
      issue_description: 'Descrição da solicitação aprovada.',
    },
    {
      id: 5,
      client: 'zé',
      product: 'Solicitação Redirecionada',
      order_date: '18/09/2025',
      situation: SituationEnum.REDIRECIONADA,
      category: 'Categoria 5',
      price: 500.0,
      issue_description: 'Descrição da solicitação redirecionada.',
    },
    {
      id: 6,
      client: 'zé',
      product: 'Solicitação Arrumada',
      order_date: '18/09/2025',
      situation: SituationEnum.ARRUMADA,
      category: 'Categoria 6',
      price: 600.0,
      issue_description: 'Descrição da solicitação arrumada.',
    },
    {
      id: 7,
      client: 'zé',
      product: 'Solicitação Paga',
      order_date: '18/09/2025',
      situation: SituationEnum.PAGA,
      category: 'Categoria 7',
      price: 700.0,
      issue_description: 'Descrição da solicitação paga.',
    },
    {
      id: 8,
      client: 'zé',
      product: 'Solicitação Finalizada',
      order_date: '18/09/2025',
      situation: SituationEnum.FINALIZADA,
      category: 'Categoria 8',
      price: 800.0,
      issue_description: 'Descrição da solicitação finalizada.',
    },
  ];
}