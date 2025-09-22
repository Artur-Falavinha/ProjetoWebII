import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent, ButtonComponent } from '@/app/lib/components';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { QuoteCardComponent } from '@/app/lib/components/molecules/quote-card/quote-card.component';
import { S } from '@angular/cdk/keycodes';
import { delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-quote',
  imports: [
    AsyncPipe,
    NgIf,
    SidebarComponent,
    ButtonComponent,
    QuoteCardComponent,
  ],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuoteComponent {
  public items: OrderRequest[] = [
    {
      id: 1,
      client: 'zé',
      product: 'Solicitação Aberta',
      order_date: '2025-09-18',
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
      order_date: '2025-09-18',
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
      order_date: '2025-09-18',
      situation: SituationEnum.REJEITADA,
      category: 'Categoria 3',
      price: 300.0,
      issue_description: 'Descrição da solicitação rejeitada.',
    },
    {
      id: 4,
      client: 'zé',
      product: 'Solicitação Aprovada',
      order_date: '2025-09-18',
      situation: SituationEnum.APROVADA,
      category: 'Categoria 4',
      price: 400.0,
      issue_description: 'Descrição da solicitação aprovada.',
    },
    {
      id: 5,
      client: 'zé',
      product: 'Solicitação Redirecionada',
      order_date: '2025-09-18',
      situation: SituationEnum.REDIRECIONADA,
      category: 'Categoria 5',
      price: 500.0,
      issue_description: 'Descrição da solicitação redirecionada.',
    },
    {
      id: 6,
      client: 'zé',
      product: 'Solicitação Arrumada',
      order_date: '2025-09-18',
      situation: SituationEnum.ARRUMADA,
      category: 'Categoria 6',
      price: 600.0,
      issue_description: 'Descrição da solicitação arrumada.',
    },
    {
      id: 7,
      client: 'zé',
      product: 'Solicitação Paga',
      order_date: '2025-09-18',
      situation: SituationEnum.PAGA,
      category: 'Categoria 7',
      price: 700.0,
      issue_description: 'Descrição da solicitação paga.',
    },
    {
      id: 8,
      client: 'zé',
      product: 'Solicitação Finalizada',
      order_date: '2025-09-18',
      situation: SituationEnum.FINALIZADA,
      category: 'Categoria 8',
      price: 800.0,
      issue_description: 'Descrição da solicitação finalizada.',
    },
  ];

  public id!: number;

  order$!: Observable<OrderRequest | undefined>;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.order$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) =>
        of(this.items.find((v) => v.id === id)).pipe(delay(500))
      ),
      tap((order) => {
        if (!order) {
          this.router.navigate(['/client']);
        }

        if (order && order.situation !== SituationEnum.ORCADA) {
          this.router.navigate(['/client']);
        }
      })
    );
  }
}
