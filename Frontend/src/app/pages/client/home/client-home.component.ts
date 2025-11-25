import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SidebarComponent, OrderCardComponent, ButtonComponent } from '@/app/lib/components';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { AuthService } from '@/app/lib/services/auth/auth.service';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  imports: [SidebarComponent, OrderCardComponent, ButtonComponent, AsyncPipe, CommonModule],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientHomeComponent implements OnInit {
  private solicitacaoService = inject(SolicitacaoService);
  private authService = inject(AuthService);
  public items$!: Observable<OrderRequest[]>;

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.items$ = this.solicitacaoService.listarTodas().pipe(
        map(solicitacoes =>
          solicitacoes
            .filter(s => s.clientEmail === currentUser.email)
            .sort((a, b) => {
              const dateA = a.dataCriacao ? new Date(a.dataCriacao).getTime() : 0;
              const dateB = b.dataCriacao ? new Date(b.dataCriacao).getTime() : 0;
              return dateA - dateB;
            })
        )
      );
    } else {
      this.items$ = new Observable<OrderRequest[]>(observer => observer.next([]));
    }
  }
}

