import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarComponent, ButtonComponent } from '@/app/lib/components';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { delay, map, Observable, of, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { BudgetCardComponent } from '@/app/lib/components/molecules/budget-card/budget-card.component';

@Component({
  selector: 'app-efetuar-orcamento',
  imports: [
    AsyncPipe,
    NgIf,
    SidebarComponent,
    ButtonComponent,
    BudgetCardComponent
  ],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrl: './efetuar-orcamento.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EfetuarOrcamentoComponent {
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
          this.router.navigate(['/admin/solicitacoes']);
        }

        if (order && order.situation !== SituationEnum.ABERTA) {
          this.router.navigate(['/admin/solicitacoes']);
        }
      })
    );
  }
}
