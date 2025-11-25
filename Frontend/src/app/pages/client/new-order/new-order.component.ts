import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  SidebarComponent,
  ButtonComponent,
  NewOrderCardComponent,
} from '@/app/lib/components';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';

@Component({
  selector: 'app-new-order',
  imports: [SidebarComponent, ButtonComponent, NewOrderCardComponent],
  templateUrl: './new-order.component.html',
  styleUrl: './new-order.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewOrderComponent { }
