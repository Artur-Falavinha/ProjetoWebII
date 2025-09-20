import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

/**
 * Card de estatística reutilizável
 * Segue o padrão de componentização do projeto
 */
@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  
  @Input() icon: string = 'info';
  @Input() number: number = 0;
  @Input() label: string = '';
  @Input() variant: 'primary' | 'success' | 'warning' | 'info' = 'primary';

  /**Retorna a classe CSS baseada na variante**/
  get variantClass(): string {
    return `stat-card-${this.variant}`;
  }
}
