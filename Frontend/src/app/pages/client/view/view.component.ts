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
import { HistoryType } from '@/app/@types/misc/HistoryType';

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
  order$!: Observable<OrderRequest | undefined>;
  history$!: Observable<HistoryType[] | undefined>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {
    this.order$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.solicitacaoService.buscaPorId(id)),
      tap((order) => {
        if (!order) {
          this.router.navigate(['/client']);
        }
      })
    );

    this.history$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.solicitacaoService.buscarHistoricosPorId(id)),
      tap((order) => {
        if (!order) {
          this.router.navigate(['/client']);
        }
      })
    );
  }
}
