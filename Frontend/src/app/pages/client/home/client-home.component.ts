import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent, ButtonComponent, SolicitacaoCardComponent } from '@/app/lib/components';
import { SolicitacaoData } from '@/app/lib/components/molecules/solicitation-card/solicitation-card.component';

interface SolicitacaoManutencao {
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  dataHora: Date;
  estado: 'ABERTA' | 'ORCAMENTO' | 'CONCLUIDA';
}

@Component({
  selector: 'app-client',
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    SidebarComponent,
    ButtonComponent,
    SolicitacaoCardComponent
  ],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientHomeComponent {
  // Signal para gerenciar as solicitações
  private solicitacoesSignal = signal<SolicitacaoManutencao[]>([]);

  // Dados de exemplo para demonstração
  exemplo1: SolicitacaoData = {
    id: 1,
    descricaoEquipamento: 'Notebook Dell Inspiron 15',
    categoriaEquipamento: 'Informática',
    descricaoDefeito: 'Tela com linhas horizontais e travamentos frequentes',
    dataHora: new Date('2024-01-15T07:30:00'),
    estado: 'ORCAMENTO',
    valor: 150.00,
    tecnico: 'João Silva'
  };

  exemplo2: SolicitacaoData = {
    id: 2,
    descricaoEquipamento: 'Smartphone Samsung Galaxy',
    categoriaEquipamento: 'Eletrônicos',
    descricaoDefeito: 'Bateria não carrega e tela com rachaduras',
    dataHora: new Date('2024-01-13T06:20:00'),
    estado: 'ABERTA',
    valor: 120.00,
    tecnico: 'Maria Santos'
  };

  constructor() {
    this.carregarSolicitacoes();
  }

  // Computed properties para estatísticas
  getTotalSolicitacoes = computed(() => this.solicitacoesSignal().length);
  
  getSolicitacoesAbertas = computed(() => 
    this.solicitacoesSignal().filter(s => s.estado === 'ABERTA').length
  );
  
  getSolicitacoesOrcamento = computed(() => 
    this.solicitacoesSignal().filter(s => s.estado === 'ORCAMENTO').length
  );
  
  getSolicitacoesConcluidas = computed(() => 
    this.solicitacoesSignal().filter(s => s.estado === 'CONCLUIDA').length
  );

  getSolicitacoesRecentes = computed(() => 
    this.solicitacoesSignal()
      .sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime())
      .slice(0, 5)
  );

  // Método para carregar solicitações do localStorage
  private carregarSolicitacoes() {
    const dados = localStorage.getItem('solicitacoes');
    if (dados) {
      const solicitacoes = JSON.parse(dados).map((s: any) => ({
        ...s,
        dataHora: new Date(s.dataHora)
      }));
      this.solicitacoesSignal.set(solicitacoes);
    }
  }

  // Método para formatar data
  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  }

  // Métodos para ações rápidas
  verHistorico() {
    // TODO: Implementar navegação para histórico
    console.log('Ver histórico');
  }

  verRelatorios() {
    // TODO: Implementar navegação para relatórios
    console.log('Ver relatórios');
  }

  contatarSuporte() {
    // TODO: Implementar modal ou navegação para suporte
    console.log('Contatar suporte');
  }

  // Métodos para interação com os cards
  onViewSolicitacao(solicitacao: SolicitacaoData) {
    console.log('Visualizar solicitação:', solicitacao);
    // TODO: Implementar navegação para detalhes da solicitação
  }

  onApproveSolicitacao(solicitacao: SolicitacaoData) {
    console.log('Aprovar/Rejeitar solicitação:', solicitacao);
    // TODO: Implementar modal de aprovação/rejeição
  }
}