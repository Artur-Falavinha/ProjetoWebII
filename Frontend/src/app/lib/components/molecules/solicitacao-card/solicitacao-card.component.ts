import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { ButtonComponent } from '@/app/lib/components/atoms/button/button.component';
import { TagComponent } from '../../atoms/tag/tag.component';

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
    TagComponent
  ],
  templateUrl: './solicitacao-card.component.html',
  styleUrl: './solicitacao-card.component.scss',
})
export class SolicitacaoCardComponent {
  @Input() solicitacao!: OrderRequest;
  @Input() showActions: boolean = true;

  /** Eventos de ação e visualização **/
  @Output() efetuarAcao = new EventEmitter<OrderRequest>();
  @Output() verDetalhes = new EventEmitter<OrderRequest>();

  modalAberto = false;
  solicitacaoSelecionada: OrderRequest | null = null;

  SituationEnum = SituationEnum;

  onEfetuarAcao(): void {
    this.efetuarAcao.emit(this.solicitacao);
  }

  onVerDetalhes(): void {
    this.verDetalhes.emit(this.solicitacao);
    this.solicitacaoSelecionada = this.solicitacao;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.solicitacaoSelecionada = null;
  }

  /** Getters auxiliares **/
  public exibButton(status: SituationEnum): boolean {
    const statusPermitidos = [
      SituationEnum.ABERTA,
      SituationEnum.APROVADA,
      SituationEnum.REDIRECIONADA,
      SituationEnum.PAGA
    ];

    return statusPermitidos.includes(status);
  }

  getActionButtonText(status: SituationEnum): string {
    switch (status) {
      case SituationEnum.ABERTA: return 'Efetuar Orçamento';
      case SituationEnum.ORCADA: return 'Aprovar Orçamento';
      case SituationEnum.APROVADA: return 'Efetuar Manutenção';
      case SituationEnum.REDIRECIONADA: return 'Efetuar Manutenção';
      case SituationEnum.PAGA: return 'Finalizar Serviço';
      default: return 'Ação';
    }
  }

  getActionButtonVariant(status: SituationEnum) {
    switch (status) {
      case SituationEnum.ABERTA: return 'primary';
      case SituationEnum.ORCADA: return 'success';
      case SituationEnum.PAGA: return 'primary';
      case SituationEnum.FINALIZADA: return 'secondary';
      default: return 'primary';
    }
  }

  getActionButtonIcon(status: SituationEnum): string {
    switch (status) {
      case SituationEnum.ABERTA: return 'monetization_on';
      case SituationEnum.ORCADA: return 'check_circle';
      case SituationEnum.PAGA: return 'build';
      case SituationEnum.FINALIZADA: return 'visibility';
      default: return 'info';
    }
  }

  getLink(status: SituationEnum): string {
    switch (status) {
      case SituationEnum.PAGA:
        return '/admin/finalizar/' + this.solicitacao.id;
      case SituationEnum.APROVADA:
        return '/admin/manutencao/' + this.solicitacao.id;
      case SituationEnum.REDIRECIONADA:
        return '/admin/manutencao/' + this.solicitacao.id;
      default:
        return '/admin/orcamento/' + this.solicitacao.id;
    }
  }

  getShortProduct(descricaoEquipamento: string): string {
    if (!descricaoEquipamento) return '';
    return descricaoEquipamento.length > 30 ? descricaoEquipamento.substring(0, 30) + '...' : descricaoEquipamento;
  }
}
