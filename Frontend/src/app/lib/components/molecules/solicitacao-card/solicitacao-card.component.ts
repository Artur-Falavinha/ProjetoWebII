import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Solicitacao } from '@/app/shared/models/solicitacao.model';

/**
 * Card de solicitação reutilizável
 * Segue o padrão de componentização do projeto
 */
@Component({
  selector: 'app-solicitacao-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatCardModule, MatChipsModule],
  templateUrl: './solicitacao-card.component.html',
  styleUrl: './solicitacao-card.component.scss'
})
export class SolicitacaoCardComponent {
  
  @Input() solicitacao!: Solicitacao;
  @Input() showActions: boolean = true;
  
  @Output() verDetalhes = new EventEmitter<Solicitacao>();
  @Output() efetuarOrcamento = new EventEmitter<Solicitacao>();

  /**Emite evento de ver detalhes**/
  onVerDetalhes(): void {
    this.verDetalhes.emit(this.solicitacao);
  }

  /**Emite evento de efetuar orçamento**/
  onEfetuarOrcamento(): void {
    this.efetuarOrcamento.emit(this.solicitacao);
  }

  /**Formata data para exibição**/
  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  }

  /**Formata data simples**/
  formatarDataSimples(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(data);
  }

  /**Retorna classe CSS do status**/
  getStatusClass(status: string): string {
    switch(status) {
      case 'ABERTA': return 'status-aberta';
      case 'ORCADA': return 'status-orcada';
      case 'APROVADA': return 'status-aprovada';
      case 'FINALIZADA': return 'status-finalizada';
      default: return 'status-aberta';
    }
  }

  /**Retorna texto do status**/
  getStatusText(status: string): string {
    switch(status) {
      case 'ABERTA': return 'Aberta';
      case 'ORCADA': return 'Orçada';
      case 'APROVADA': return 'Aprovada';
      case 'FINALIZADA': return 'Finalizada';
      default: return 'Aberta';
    }
  }
}
