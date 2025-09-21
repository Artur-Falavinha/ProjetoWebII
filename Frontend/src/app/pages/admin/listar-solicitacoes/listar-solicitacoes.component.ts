import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';
import { StatCardComponent } from '@/app/lib/components/molecules/stat-card/stat-card.component';
import { SolicitacaoCardComponent as SolicitacaoCardNewComponent } from '@/app/lib/components/molecules/solicitacao-card/solicitacao-card.component';
import { ModalComponent } from '@/app/lib/components/molecules/modal/modal.component';
import { AuthService } from '@/app/lib/services/auth/auth.service';
import { Solicitacao } from '@/app/shared/models/solicitacao.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solicitacoes-component', 
  standalone: true,           
  imports: [
    CommonModule,              
    SidebarComponent,
    StatCardComponent,
    SolicitacaoCardNewComponent,
    ModalComponent,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './listar-solicitacoes.component.html',
  styleUrls: ['./listar-solicitacoes.component.scss']
})
export class ListarSolicitacoesComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  /**Dados simulados para o dashboard**/
  Solicitacoes: Solicitacao[] = [];

  /**Modal de detalhes**/
  modalAberto = false;
  solicitacaoSelecionada: Solicitacao | null = null;

  constructor() {
    /**Simular login de funcionário para visualização**/
    this.authService.login({ email: 'funcionario@email.com', password: 'senha' }).subscribe();
  }

  ngOnInit(): void {
    this.carregarDadosDashboard();
  }

  carregarDadosDashboard(): void {
    /**Dados simulados para demonstração**/
    this.Solicitacoes = [
      new Solicitacao(
        1,
        'Mesa de escritório',
        'João Silva',
        'joao.silva@email.com',
        'Móveis',
        'Gaveta não abre, trava emperrada',
        new Date('2024-01-16T05:00:00'),
        'ABERTA'
      ),
      new Solicitacao(
        2,
        'Notebook Dell',
        'Maria Santos',
        'maria.santos@email.com',
        'Informática',
        'Tela com linhas horizontais',
        new Date('2024-01-15T14:30:00'),
        'ABERTA'
      )
    ];
  }

  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  }

  formatarDataSimples(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(data);
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'ABERTA': return 'status-aberta';
      case 'ORCADA': return 'status-orcada';
      case 'APROVADA': return 'status-aprovada';
      case 'FINALIZADA': return 'status-finalizada';
      default: return 'status-aberta';
    }
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'ABERTA': return 'Aberta';
      case 'ORCADA': return 'Orçada';
      case 'APROVADA': return 'Aprovada';
      case 'FINALIZADA': return 'Finalizada';
      default: return 'Aberta';
    }
  }

  verDetalhes(solicitacao: Solicitacao): void {
    this.solicitacaoSelecionada = solicitacao;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.solicitacaoSelecionada = null;
  }

  efetuarOrcamento(solicitacao: Solicitacao): void {
    this.router.navigate(['/admin/orcamento', solicitacao.id]);
  }

}