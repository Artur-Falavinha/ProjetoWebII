import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';
import { StatCardComponent } from '@/app/lib/components/molecules/stat-card/stat-card.component';
import { SolicitacaoCardComponent as SolicitacaoCardNewComponent } from '@/app/lib/components/molecules/solicitacao-card/solicitacao-card.component';
import { ModalComponent } from '@/app/lib/components/molecules/modal/modal.component';
import { AuthService } from '@/app/lib/services/auth/auth.service';
import { SolicitacaoRequest, SituationEnum } from '@/app/@types';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionario', 
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
  templateUrl: './funcionario.html',
  styleUrls: ['./funcionario.scss']
})
export class FuncionarioComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  /**Dados simulados para o dashboard**/
  solicitacoesAbertas: SolicitacaoRequest[] = [];
  estatisticas = {
    abertas: 0,
    orcadas: 0,
    aprovadas: 0,
    finalizadas: 0
  };

  /**Modal de detalhes**/
  modalAberto = false;
  solicitacaoSelecionada: SolicitacaoRequest | null = null;

  constructor() {
    /**Simular login de funcionário para visualização**/
    this.authService.login({ email: 'funcionario@email.com', password: 'senha' }).subscribe();
  }

  ngOnInit(): void {
    this.carregarDadosDashboard();
  }

  carregarDadosDashboard(): void {
    /**Dados simulados para demonstração**/
    this.solicitacoesAbertas = [
      {
        id: 1,
        equipamento: 'Mesa de escritório',
        cliente: 'João Silva',
        clienteEmail: 'joao.silva@email.com',
        categoria: 'Móveis',
        descricaoProblema: 'Gaveta não abre, trava emperrada',
        dataHora: '2024-01-16T05:00:00',
        status: SituationEnum.ABERTA
      },
      {
        id: 2,
        equipamento: 'Notebook Dell',
        cliente: 'Maria Santos',
        clienteEmail: 'maria.santos@email.com',
        categoria: 'Informática',
        descricaoProblema: 'Tela com linhas horizontais',
        dataHora: '2024-01-15T14:30:00',
        status: SituationEnum.ABERTA
      }
    ];

    /**Estatísticas simuladas**/
    this.estatisticas = {
      abertas: 1,
      orcadas: 1,
      aprovadas: 1,
      finalizadas: 1
    };
  }

  formatarData(data: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(data));
  }

  formatarDataSimples(data: string): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(data));
  }

  getStatusClass(status: SituationEnum): string {
    switch(status) {
      case SituationEnum.ABERTA: return 'status-aberta';
      case SituationEnum.ORCADA: return 'status-orcada';
      case SituationEnum.APROVADA: return 'status-aprovada';
      case SituationEnum.FINALIZADA: return 'status-finalizada';
      default: return 'status-aberta';
    }
  }

  getStatusText(status: SituationEnum): string {
    switch(status) {
      case SituationEnum.ABERTA: return 'Aberta';
      case SituationEnum.ORCADA: return 'Orçada';
      case SituationEnum.APROVADA: return 'Aprovada';
      case SituationEnum.FINALIZADA: return 'Finalizada';
      default: return 'Aberta';
    }
  }

  verDetalhes(solicitacao: SolicitacaoRequest): void {
    this.solicitacaoSelecionada = solicitacao;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.solicitacaoSelecionada = null;
  }

  efetuarOrcamento(solicitacao: SolicitacaoRequest): void {
    console.log('Efetuar orçamento:', solicitacao);
    /**TODO: Implementar modal de orçamento**/
  }

  verTodasSolicitacoes(): void {
    this.router.navigate(['/admin/solicitacoes']);
  }
}