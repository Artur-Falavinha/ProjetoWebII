import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarComponent, ButtonComponent } from '@/app/lib/components';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { QuoteCardComponent } from '@/app/lib/components/molecules/quote-card/quote-card.component';
import { S } from '@angular/cdk/keycodes';
import { delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';

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
  order$!: Observable<OrderRequest | undefined>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {
    this.order$ = this.route.paramMap.pipe(
      map((params) => Number(params.get('id'))),
      switchMap((id) => this.solicitacaoService.buscaPorId(id)),
      tap((order) => {
        if (!order || order.situation !== SituationEnum.ORCADA) {
          this.router.navigate(['/client']);
        }
      })
    );
  }
}
