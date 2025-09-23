import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { ButtonComponent } from '@/app/lib/components/atoms/button/button.component';

/**
 * Card de solicitação reutilizável
 * Segue o padrão de componentização do projeto
 */
@Component({
  selector: 'app-solicitacao-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    ButtonComponent,
  ],
  templateUrl: './solicitacao-card.component.html',
  styleUrl: './solicitacao-card.component.scss',
})
export class SolicitacaoCardComponent {
  @Input() solicitacao!: OrderRequest;
  @Input() showActions: boolean = true;

  @Output() verDetalhes = new EventEmitter<OrderRequest>();

  /**Emite evento de ver detalhes**/
  onVerDetalhes(): void {
    this.verDetalhes.emit(this.solicitacao);
  }

  SituationEnum = SituationEnum;

  // @ REFATORAR ESSA LOUCURA

  /**Retorna classe CSS do status**/
  getStatusClass(status: SituationEnum): string {
    switch (status) {
      case SituationEnum.ABERTA:
        return 'status-aberta';
      case SituationEnum.ORCADA:
        return 'status-orcada';
      case SituationEnum.APROVADA:
        return 'status-aprovada';
      case SituationEnum.FINALIZADA:
        return 'status-finalizada';
      default:
        return 'status-aberta';
    }
  }

  /**Retorna texto do status**/
  getStatusText(status: SituationEnum): string {
    switch (status) {
      case SituationEnum.ABERTA:
      return 'Aberta';
      case SituationEnum.ORCADA:
      return 'Orçada';
      case SituationEnum.REJEITADA:
      return 'Rejeitada';
      case SituationEnum.APROVADA:
      return 'Aprovada';
      case SituationEnum.REDIRECIONADA:
      return 'Redirecionada';
      case SituationEnum.ARRUMADA:
      return 'Arrumada';
      case SituationEnum.PAGA:
      return 'Paga';  
      case SituationEnum.FINALIZADA:
      return 'Finalizada';
      default:
      return 'Desconhecida';
    }
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
  getActionButtonVariant(
    status: SituationEnum
  ): 'primary' | 'secondary' | 'success' | 'destructive' {
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

  getLink(status: SituationEnum): string {
    switch (status) {
      case SituationEnum.APROVADA:
        return '/admin/manutencao/' + this.solicitacao.id;
      default:
        return '/admin/orcamento/' + this.solicitacao.id;
    }
  }
}
