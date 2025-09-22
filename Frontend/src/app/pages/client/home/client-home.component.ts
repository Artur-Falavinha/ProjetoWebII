import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SidebarComponent, OrderCardComponent, ButtonComponent } from '@/app/lib/components';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';

@Component({
  selector: 'app-client',
  imports: [SidebarComponent, OrderCardComponent, ButtonComponent],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientHomeComponent {
  public items: OrderRequest[] = inject(SolicitacaoService).listarTodas();

}

