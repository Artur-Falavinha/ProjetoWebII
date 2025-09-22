import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';
import { StatCardComponent } from '@/app/lib/components/molecules/stat-card/stat-card.component';
import { ButtonComponent } from '@/app/lib/components/atoms/button/button.component';
import { AuthService } from '@/app/lib/services/auth/auth.service';
import { SolicitacaoRequest, SituationEnum, OrderRequest } from '@/app/@types';
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
    ButtonComponent,
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
  
  // Expor o enum para uso no template
  SituationEnum = SituationEnum;
  private readonly router = inject(Router);
  
  /**Array de dados mock para o dashboard**/
  private items: OrderRequest[] = [
    {
      id: 1,
      client: 'zé',
      product: 'Solicitação Aberta',
      order_date: '2025-09-18',
      situation: SituationEnum.ABERTA,
      category: 'Categoria 1',
      price: 100.0,
      issue_description: 'Descrição da solicitação aberta.',
      atributed_employee: 'zé',
    },
    {
      id: 2,
      client: 'zé',
      product: 'Solicitação Orcada',
      order_date: '2025-09-18',
      situation: SituationEnum.ORCADA,
      category: 'Categoria 2',
      price: 200.0,
      issue_description: 'Descrição da solicitação orçada.',
      atributed_employee: 'zé',
    },
    {
      id: 3,
      client: 'zé',
      product: 'Solicitação Rejeitada',
      order_date: '2025-09-18',
      situation: SituationEnum.REJEITADA,
      category: 'Categoria 3',
      price: 300.0,
      issue_description: 'Descrição da solicitação rejeitada.',
    },
    {
      id: 4,
      client: 'zé',
      product: 'Solicitação Aprovada',
      order_date: '2025-09-18',
      situation: SituationEnum.APROVADA,
      category: 'Categoria 4',
      price: 400.0,
      issue_description: 'Descrição da solicitação aprovada.',
    },
    {
      id: 5,
      client: 'zé',
      product: 'Solicitação Redirecionada',
      order_date: '2025-09-18',
      situation: SituationEnum.REDIRECIONADA,
      category: 'Categoria 5',
      price: 500.0,
      issue_description: 'Descrição da solicitação redirecionada.',
    },
    {
      id: 6,
      client: 'zé',
      product: 'Solicitação Arrumada',
      order_date: '2025-09-18',
      situation: SituationEnum.ARRUMADA,
      category: 'Categoria 6',
      price: 600.0,
      issue_description: 'Descrição da solicitação arrumada.',
    },
    {
      id: 7,
      client: 'zé',
      product: 'Solicitação Paga',
      order_date: '2025-09-18',
      situation: SituationEnum.PAGA,
      category: 'Categoria 7',
      price: 700.0,
      issue_description: 'Descrição da solicitação paga.',
    },
    {
      id: 8,
      client: 'zé',
      product: 'Solicitação Finalizada',
      order_date: '2025-09-18',
      situation: SituationEnum.FINALIZADA,
      category: 'Categoria 8',
      price: 800.0,
      issue_description: 'Descrição da solicitação finalizada.',
    },
  ];

  /**Solicitações abertas filtradas do array mock**/
  solicitacoesAbertas: OrderRequest[] = [];
  estatisticas = {
    abertas: 0,
    orcadas: 0,
    aprovadas: 0,
    finalizadas: 0
  };

  /**Modal de detalhes**/
  modalAberto = false;
  solicitacaoSelecionada: OrderRequest | null = null;

  constructor() {
    /**Simular login de funcionário para visualização**/
    this.authService.login({ email: 'funcionario@email.com', password: 'senha' }).subscribe();
  }

  ngOnInit(): void {
    this.carregarDadosDashboard();
  }

  carregarDadosDashboard(): void {
    // Filtra apenas solicitações ABERTAS conforme RF011
    this.solicitacoesAbertas = this.items.filter(item => item.situation === SituationEnum.ABERTA);
    
    // Calcula estatísticas baseadas no array mock
    this.estatisticas.abertas = this.items.filter(item => item.situation === SituationEnum.ABERTA).length;
    this.estatisticas.orcadas = this.items.filter(item => item.situation === SituationEnum.ORCADA).length;
    this.estatisticas.aprovadas = this.items.filter(item => item.situation === SituationEnum.APROVADA).length;
    this.estatisticas.finalizadas = this.items.filter(item => item.situation === SituationEnum.FINALIZADA).length;
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

  verDetalhes(solicitacao: OrderRequest): void {
    this.solicitacaoSelecionada = solicitacao;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.solicitacaoSelecionada = null;
  }

  efetuarOrcamento(solicitacao: OrderRequest): void {
    this.router.navigate(['/admin/orcamento', solicitacao.id]);
  }

  verTodasSolicitacoes(): void {
    this.router.navigate(['/admin/solicitacoes']);
  }

  /**Obtém o texto do botão de ação baseado no status da solicitação**/
  getActionButtonText(status: SituationEnum): string {
    switch (status) {
      case SituationEnum.ABERTA:
        return 'Efetuar Orçamento';
      case SituationEnum.ORCADA:
        return 'Aprovar Orçamento';
      case SituationEnum.APROVADA:
        return 'Finalizar Serviço';
      case SituationEnum.FINALIZADA:
        return 'Ver Detalhes';
      default:
        return 'Ação';
    }
  }

  /**Obtém a variante do botão baseado no status da solicitação**/
  getActionButtonVariant(status: SituationEnum): 'primary' | 'secondary' | 'success' | 'destructive' {
    switch (status) {
      case SituationEnum.ABERTA:
        return 'primary';
      case SituationEnum.ORCADA:
        return 'success';
      case SituationEnum.APROVADA:
        return 'primary';
      case SituationEnum.FINALIZADA:
        return 'secondary';
      default:
        return 'primary';
    }
  }

  /**Obtém o ícone do botão baseado no status da solicitação**/
  getActionButtonIcon(status: SituationEnum): string {
    switch (status) {
      case SituationEnum.ABERTA:
        return 'monetization_on';
      case SituationEnum.ORCADA:
        return 'check_circle';
      case SituationEnum.APROVADA:
        return 'build';
      case SituationEnum.FINALIZADA:
        return 'visibility';
      default:
        return 'info';
    }
  }
}