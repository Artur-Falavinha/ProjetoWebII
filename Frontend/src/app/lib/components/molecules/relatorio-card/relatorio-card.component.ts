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

/* import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Venda {
  data: string;   // formato YYYY-MM-DD ou DD/MM/YYYY
  valor: number;
}

function gerarRelatorioPDF(vendas: Venda[], dataInicio?: Date, dataFim?: Date) {
  const pdf = new jsPDF();

  pdf.setFontSize(16);
  pdf.text('Relatório de Receita por Dia', 14, 15);

  // Se datas forem informadas, mostrar no PDF
  if (dataInicio || dataFim) {
    pdf.setFontSize(11);
    pdf.text(
      `Período: ${dataInicio ? dataInicio.toLocaleDateString() : '-'} até ${dataFim ? dataFim.toLocaleDateString() : '-'}`,
      14,
      23
    );
  }

  // 1) Filtrar por datas (se fornecidas)
  let vendasFiltradas = vendas;

  if (dataInicio) {
    vendasFiltradas = vendasFiltradas.filter(v => new Date(v.data) >= dataInicio);
  }

  if (dataFim) {
    vendasFiltradas = vendasFiltradas.filter(v => new Date(v.data) <= dataFim);
  }

  // 2) Agrupar por dia
  const receitaPorDia: { [data: string]: number } = {};

  vendasFiltradas.forEach(v => {
    const data = new Date(v.data).toLocaleDateString('pt-BR');

    if (!receitaPorDia[data]) receitaPorDia[data] = 0;
    receitaPorDia[data] += v.valor;
  });

  // 3) Transformar em tabela
  const rows = Object.entries(receitaPorDia).map(([dia, total]) => [
    dia,
    `R$ ${total.toFixed(2)}`
  ]);

  // 4) Gerar tabela no PDF
  autoTable(pdf, {
    head: [['Dia', 'Receita']],
    body: rows,
    startY: 30,
  });

  pdf.save('relatorio-receita.pdf');
}
*/