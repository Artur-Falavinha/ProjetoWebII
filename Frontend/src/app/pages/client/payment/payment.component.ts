import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarComponent, ButtonComponent } from '@/app/lib/components';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { PaymentCardComponent } from '@/app/lib/components/molecules/payment-card/payment-card.component';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';

@Component({
  selector: 'app-payment',
  imports: [
    AsyncPipe,
    NgIf,
    SidebarComponent,
    ButtonComponent,
    PaymentCardComponent,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentComponent {
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
        if (!order || order.situation !== SituationEnum.ARRUMADA) {
          this.router.navigate(['/client']);
        }
      })
    );
  }
}
