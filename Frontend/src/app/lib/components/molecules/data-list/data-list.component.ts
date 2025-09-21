import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Componente de lista reutilizável para qualquer tipo de dados
 * Segue o padrão de componentização do projeto
 */
@Component({
  selector: 'app-data-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './data-list.component.html',
  styleUrl: './data-list.component.scss'
})
export class DataListComponent<T = any> {
  
  @Input() items: T[] = [];
  @Input() emptyStateIcon: string = 'inbox';
  @Input() emptyStateTitle: string = 'Nenhum item encontrado';
  @Input() emptyStateDescription: string = 'Adicione novos itens para começar';
  @Input() showAddButton: boolean = true;
  @Input() addButtonText: string = 'Adicionar Novo';
  @Input() addButtonIcon: string = 'add';
  
  @Output() addClick = new EventEmitter<void>();
  @Output() editClick = new EventEmitter<T>();
  @Output() deleteClick = new EventEmitter<T>();
  
  @ContentChild('listItem') itemTemplate: TemplateRef<any> | null = null;
  @ContentChild('emptyState') emptyTemplate: TemplateRef<any> | null = null;

  /**Emite evento de clique no botão adicionar**/
  onAddClick(): void {
    this.addClick.emit();
  }

  /**Emite evento de clique em editar**/
  onEditClick(item: T): void {
    this.editClick.emit(item);
  }

  /**Emite evento de clique em excluir**/
  onDeleteClick(item: T): void {
    this.deleteClick.emit(item);
  }

  /**Verifica se a lista está vazia**/
  get isEmpty(): boolean {
    return !this.items || this.items.length === 0;
  }
}
