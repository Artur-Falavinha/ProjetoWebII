import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Funcionario } from '@/app/shared/models/funcionario.model';

/**
 * Componente de item de funcionário reutilizável
 * Segue o padrão de componentização do projeto
 */
@Component({
  selector: 'app-funcionario-item',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './funcionario-item.component.html',
  styleUrl: './funcionario-item.component.scss'
})
export class FuncionarioItemComponent {
  
  @Input() funcionario!: Funcionario;
  @Input() showActions: boolean = true;
  
  @Output() editClick = new EventEmitter<Funcionario>();
  @Output() deleteClick = new EventEmitter<Funcionario>();

  /**Emite evento de clique em editar**/
  onEditClick(): void {
    this.editClick.emit(this.funcionario);
  }

  /**Emite evento de clique em excluir**/
  onDeleteClick(): void {
    this.deleteClick.emit(this.funcionario);
  }

  /**Formata data para exibição**/
  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(data));
  }

  /**Formata data simples para exibição**/
  formatarDataSimples(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(data));
  }

  /**Retorna classe CSS do status**/
  getStatusClass(ativo: boolean): string {
    return ativo ? 'status-ativo' : 'status-inativo';
  }

  /**Retorna texto do status**/
  getStatusText(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
  }
}
