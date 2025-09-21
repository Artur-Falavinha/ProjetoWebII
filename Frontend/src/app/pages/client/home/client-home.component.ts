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
      product: 'Solicitação Aberta',
      order_date: '2025-09-18',
      situation: SituationEnum.ABERTA,
      category: 'Categoria 1',
      price: 100.00
    },
    {
      id: 2,
      product: 'Solicitação Orcada',
      order_date: '2025-09-18',
      situation: SituationEnum.ORCADA,
      category: 'Categoria 2',
      price: 200.00
    },
    {
      id: 3,
      product: 'Solicitação Rejeitada',
      order_date: '2025-09-18',
      situation: SituationEnum.REJEITADA,
      category: 'Categoria 3',
      price: 300.00
    },
    {
      id: 4,
      product: 'Solicitação Aprovada',
      order_date: '2025-09-18',
      situation: SituationEnum.APROVADA,
      category: 'Categoria 4',
      price: 400.00
    },
    {
      id: 5,
      product: 'Solicitação Redirecionada',
      order_date: '2025-09-18',
      situation: SituationEnum.REDIRECIONADA,
      category: 'Categoria 5',
      price: 500.00
    },
    {
      id: 6,
      product: 'Solicitação Arrumada',
      order_date: '2025-09-18',
      situation: SituationEnum.ARRUMADA,
      category: 'Categoria 6',
      price: 600.00
    },
    {
      id: 7,
      product: 'Solicitação Paga',
      order_date: '2025-09-18',
      situation: SituationEnum.PAGA,
      category: 'Categoria 7',
      price: 700.00
    },
    {
      id: 8,
      product: 'Solicitação Finalizada',
      order_date: '2025-09-18',
      situation: SituationEnum.FINALIZADA,
      category: 'Categoria 8',
      price: 800.00
    }
  ];
}