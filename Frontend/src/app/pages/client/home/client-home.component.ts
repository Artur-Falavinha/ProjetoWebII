import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { SidebarComponent, OrderCardComponent, ButtonComponent } from '@/app/lib/components';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { AuthService } from '@/app/lib/services/auth/auth.service';

@Component({
  selector: 'app-client',
  imports: [SidebarComponent, OrderCardComponent, ButtonComponent],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientHomeComponent implements OnInit {
  private solicitacaoService = inject(SolicitacaoService);
  private authService = inject(AuthService);
  public items = signal<OrderRequest[]>([]);

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      const todasSolicitacoes = this.solicitacaoService.listarTodas();
      const solicitacoesDoCliente = todasSolicitacoes
        .filter(s => s.clientEmail === currentUser.email)
        .sort((a, b) => {
          const dateA = a.dataCriacao ? new Date(a.dataCriacao).getTime() : 0;
          const dateB = b.dataCriacao ? new Date(b.dataCriacao).getTime() : 0;
          return dateA - dateB;
        });
      this.items.set(solicitacoesDoCliente);
    }
  }
}

