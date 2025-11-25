import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  inject,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { map, Observable, switchMap, tap } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { FinishCardComponent } from '@/app/lib/components/molecules/finish-card/finish-card.component';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { ButtonComponent } from '@/app/lib/components/atoms/button/button.component';
import { SidebarComponent } from '@/app/lib/components';

@Component({
  selector: 'app-finalizar-solicitacao',
  standalone: true,
  imports: [NgIf, SidebarComponent, ButtonComponent, FinishCardComponent, AsyncPipe],
  templateUrl: './finalizar-solicitacao.component.html',
  styleUrl: './finalizar-solicitacao.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalizarSolicitacaoComponent {
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
        if (!order || order.situation !== SituationEnum.PAGA) {
          this.router.navigate(['/admin/solicitacoes']);
        }
      })
    );
  }
}
