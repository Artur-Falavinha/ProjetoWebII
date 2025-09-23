import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

import { ButtonComponent } from '@/app/lib/components/atoms/button/button.component';

export interface RelatorioCardData {
  titulo: string;
  periodo: string;
  tipo: string;
  filtros: string;
  status: string;
  formato: string;
  id: string;
  icon: string;
  botaoTexto: string;
  botaoIcone: string;
  temFiltros: boolean;
}

export interface FiltroReceitas {
  dataInicial: string;
  dataFinal: string;
}

@Component({
  selector: 'app-relatorio-card',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    ButtonComponent
  ],
  templateUrl: './relatorio-card.component.html',
  styleUrls: ['./relatorio-card.component.scss']
})
export class RelatorioCardComponent {
  @Input() relatorio!: RelatorioCardData;
  @Input() gerandoRelatorio = false;
  @Input() filtroReceitas: FiltroReceitas = {
    dataInicial: '',
    dataFinal: ''
  };

  @Output() gerarRelatorio = new EventEmitter<FiltroReceitas>();

  onGerarRelatorio(): void {
    this.gerarRelatorio.emit(this.filtroReceitas);
  }
}
