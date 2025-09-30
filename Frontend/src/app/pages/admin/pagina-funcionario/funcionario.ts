import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';
import { StatCardComponent } from '@/app/lib/components/molecules/stat-card/stat-card.component';
import { ButtonComponent } from '@/app/lib/components/atoms/button/button.component';
import { AuthService } from '@/app/lib/services/auth/auth.service';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';

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
  
  /**Array de dados para o dashboard vindo do service**/
  public items: OrderRequest[] = inject(SolicitacaoService).listarTodas();

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

  private readonly solicitacaoService = inject(SolicitacaoService);

  constructor() {
    // Login automático para demonstração (remover em produção)
    this.authService.login({ email: 'funcionario@email.com', password: 'senha' }).subscribe();
    
    // Carrega todas as solicitações do localStorage
    this.items = this.solicitacaoService.listarTodas();
  }

  ngOnInit(): void {
    this.carregarDadosDashboard();
  }

  /**
   * Carrega os dados do dashboard do funcionário
   * Filtra solicitações abertas e calcula estatísticas
   * Conforme RF011 - Página Inicial de Funcionário
   */
  carregarDadosDashboard(): void {
    // Filtra apenas solicitações ABERTAS conforme RF011
    // Essas necessitam de atenção imediata do funcionário
    this.solicitacoesAbertas = this.items.filter(
      item => item.situation === SituationEnum.ABERTA
    );
    
    // Calcula estatísticas para os cards
    this.estatisticas.abertas = this.items.filter(
      item => item.situation === SituationEnum.ABERTA
    ).length;
    
    this.estatisticas.orcadas = this.items.filter(
      item => item.situation === SituationEnum.ORCADA
    ).length;
    
    this.estatisticas.aprovadas = this.items.filter(
      item => item.situation === SituationEnum.APROVADA
    ).length;
    
    this.estatisticas.finalizadas = this.items.filter(
      item => item.situation === SituationEnum.FINALIZADA
    ).length;
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

  /**
   * Abre o modal com os detalhes da solicitação selecionada
   */
  verDetalhes(solicitacao: OrderRequest): void {
    this.solicitacaoSelecionada = solicitacao;
    this.modalAberto = true;
  }

  /**
   * Fecha o modal de detalhes e limpa a solicitação selecionada
   */
  fecharModal(): void {
    this.modalAberto = false;
    this.solicitacaoSelecionada = null;
  }

  /**
   * Navega para a tela de efetuar orçamento da solicitação
   * RF012 - Efetuar Orçamento
   */
  efetuarOrcamento(solicitacao: OrderRequest): void {
    this.router.navigate(['/admin/orcamento', solicitacao.id]);
  }

  /**
   * Navega para a listagem completa de todas as solicitações
   */
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