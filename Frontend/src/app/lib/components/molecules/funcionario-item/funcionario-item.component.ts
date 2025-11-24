import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FuncionarioRequest } from '@/app/@types';

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
  
  @Input() funcionario!: FuncionarioRequest;
  @Input() showActions: boolean = true;
  
  @Output() editClick = new EventEmitter<FuncionarioRequest>();
  @Output() deleteClick = new EventEmitter<FuncionarioRequest>();

  onEditClick(): void {
    this.editClick.emit(this.funcionario);
  }

  onDeleteClick(): void {
    this.deleteClick.emit(this.funcionario);
  }


  getStatusClass(ativo: boolean): string {
    return ativo ? 'status-ativo' : 'status-inativo';
  }

  getStatusText(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
  }
}
