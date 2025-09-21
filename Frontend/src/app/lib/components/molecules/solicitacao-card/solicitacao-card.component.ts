import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { SolicitacaoRequest, SituationEnum } from '@/app/@types';

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
  
  @Input() solicitacao!: SolicitacaoRequest;
  @Input() showActions: boolean = true;
  
  @Output() verDetalhes = new EventEmitter<SolicitacaoRequest>();
  @Output() efetuarOrcamento = new EventEmitter<SolicitacaoRequest>();

  /**Emite evento de ver detalhes**/
  onVerDetalhes(): void {
    this.verDetalhes.emit(this.solicitacao);
  }

  /**Emite evento de efetuar orçamento**/
  onEfetuarOrcamento(): void {
    this.efetuarOrcamento.emit(this.solicitacao);
  }


  /**Retorna classe CSS do status**/
  getStatusClass(status: SituationEnum): string {
    switch(status) {
      case SituationEnum.ABERTA: return 'status-aberta';
      case SituationEnum.ORCADA: return 'status-orcada';
      case SituationEnum.APROVADA: return 'status-aprovada';
      case SituationEnum.FINALIZADA: return 'status-finalizada';
      default: return 'status-aberta';
    }
  }

  /**Retorna texto do status**/
  getStatusText(status: SituationEnum): string {
    switch(status) {
      case SituationEnum.ABERTA: return 'Aberta';
      case SituationEnum.ORCADA: return 'Orçada';
      case SituationEnum.APROVADA: return 'Aprovada';
      case SituationEnum.FINALIZADA: return 'Finalizada';
      default: return 'Aberta';
    }
  }
}
