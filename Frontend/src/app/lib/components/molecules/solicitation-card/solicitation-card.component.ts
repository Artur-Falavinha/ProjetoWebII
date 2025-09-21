import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '@/app/lib/components';

export interface SolicitacaoData {
  id?: number;
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  dataHora: Date;
  estado: 'ABERTA' | 'ORCAMENTO' | 'CONCLUIDA';
  valor?: number;
  tecnico?: string;
}

@Component({
  selector: 'app-solicitation-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    ButtonComponent
  ],
  templateUrl: './solicitation-card.component.html',
  styleUrls: ['./solicitation-card.component.scss']
})
export class SolicitacaoCardComponent {
  @Input() solicitacao!: SolicitacaoData;
  @Input() showActions: boolean = true;
  
  @Output() viewClicked = new EventEmitter<SolicitacaoData>();
  @Output() approveClicked = new EventEmitter<SolicitacaoData>();

  onViewClick() {
    this.viewClicked.emit(this.solicitacao);
  }

  onApproveClick() {
    this.approveClicked.emit(this.solicitacao);
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

  getStatusClass(): string {
    return `status-${this.solicitacao.estado.toLowerCase()}`;
  }

  getStatusLabel(): string {
    const labels = {
      'ABERTA': 'Aberta',
      'ORCAMENTO': 'Orçada',
      'CONCLUIDA': 'Concluída'
    };
    return labels[this.solicitacao.estado] || this.solicitacao.estado;
  }
}
