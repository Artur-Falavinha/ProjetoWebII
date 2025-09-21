import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

/**
 * Componente modal reutilizável para qualquer tipo de formulário
 * Segue o padrão de componentização do projeto
 */
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() submitButtonText: string = 'Salvar';
  @Input() showCancelButton: boolean = true;
  @Input() isFormValid: boolean = true;
  @Input() isLoading: boolean = false;
  
  @Output() close = new EventEmitter<void>();
  @Output() submit = new EventEmitter<void>();
  
  @ContentChild('modalContent') contentTemplate: TemplateRef<any> | null = null;

  /**Emite evento de fechamento**/
  onClose(): void {
    this.close.emit();
  }

  /**Emite evento de submissão**/
  onSubmit(): void {
    if (this.isFormValid && !this.isLoading) {
      this.submit.emit();
    }
  }
}
