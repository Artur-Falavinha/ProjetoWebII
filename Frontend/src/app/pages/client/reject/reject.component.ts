import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarComponent, ButtonComponent } from '@/app/lib/components';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { RejectCardComponent } from '@/app/lib/components/molecules/reject-card/reject-card.component';
import { RescueCardComponent } from '@/app/lib/components/molecules/rescue-card/rescue-card.component';
import { S } from '@angular/cdk/keycodes';
import { delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';

@Component({
  selector: 'app-reject',
  imports: [
    AsyncPipe,
    NgIf,
    SidebarComponent,
    ButtonComponent,
    RejectCardComponent,
    RescueCardComponent,
  ],
  templateUrl: './reject.component.html',
  styleUrl: './reject.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RejectComponent {
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
