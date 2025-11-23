import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarComponent, ButtonComponent } from '@/app/lib/components';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { QuoteCardComponent } from '@/app/lib/components/molecules/quote-card/quote-card.component';
import { S } from '@angular/cdk/keycodes';
import { delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ViewCardComponent } from '@/app/lib/components/molecules/view-card/view-card.component';
import { HistoryCardComponent } from '@/app/lib/components/molecules/history-card/history-card.component';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';

@Component({
  selector: 'app-view',
  imports: [
    AsyncPipe,
    NgIf,
    SidebarComponent,
    ButtonComponent,
    ViewCardComponent,
    HistoryCardComponent,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent {
  public items: OrderRequest[] = inject(SolicitacaoService).listarTodas();

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

        // if (
        //   order &&
        //   ![
        //     SituationEnum.ABERTA,
        //     SituationEnum.PAGA,
        //     SituationEnum.REDIRECIONADA,
        //     SituationEnum.FINALIZADA,
        //   ].includes(order.situation)
        // ) {
        //   this.router.navigate(['/client']);
        // }
      })
    );
  }
}
