import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';
import { RelatorioCardComponent, RelatorioCardData } from '@/app/lib/components/molecules/relatorio-card/relatorio-card.component';
import { ButtonComponent } from '@/app/lib/components/atoms/button/button.component';

interface FiltroReceitas {
  dataInicial: string;
  dataFinal: string;
}

interface DadoRelatorio {
  data?: string;
  categoria?: string;
  valor: number;
}

interface Relatorio {
  titulo: string;
  tipo: 'receitas' | 'categorias';
  periodo: string;
  dataGeracao: string;
  totalGeral: number;
  dados: DadoRelatorio[];
}

@Component({
  selector: 'app-relatorios',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    SidebarComponent,
    RelatorioCardComponent,
    ButtonComponent
  ],
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  // Filtros para relatório de receitas
  filtroReceitas: FiltroReceitas = {
    dataInicial: '',
    dataFinal: ''
  };

  // Estado do modal
  modalRelatorioAberto = false;
  relatorioAtual: Relatorio | null = null;
  gerandoRelatorio = false;

  // Dados dos relatórios para os cards
  relatorios: RelatorioCardData[] = [];

  // Dados simulados para relatório de receitas por período
  private dadosReceitasSimulados: DadoRelatorio[] = [
    { data: '01/01/2024', valor: 2500.00 },
    { data: '02/01/2024', valor: 3200.50 },
    { data: '03/01/2024', valor: 1800.75 },
    { data: '04/01/2024', valor: 4100.25 },
    { data: '05/01/2024', valor: 2900.00 },
    { data: '06/01/2024', valor: 3500.80 },
    { data: '07/01/2024', valor: 2200.40 },
    { data: '08/01/2024', valor: 3800.60 },
    { data: '09/01/2024', valor: 2600.30 },
    { data: '10/01/2024', valor: 4200.90 },
    { data: '11/01/2024', valor: 3100.15 },
    { data: '12/01/2024', valor: 2800.45 },
    { data: '13/01/2024', valor: 3600.70 },
    { data: '14/01/2024', valor: 2400.85 },
    { data: '15/01/2024', valor: 3900.20 }
  ];

  // Dados simulados para relatório de receitas por categoria
  private dadosCategoriasSimulados: DadoRelatorio[] = [
    { categoria: 'Computadores', valor: 15000.50 },
    { categoria: 'Impressoras', valor: 8500.25 },
    { categoria: 'Roteadores', valor: 6200.75 },
    { categoria: 'Monitores', valor: 11200.00 },
    { categoria: 'Teclados e Mouses', valor: 3200.40 },
    { categoria: 'Servidores', valor: 25000.80 },
    { categoria: 'Switches', valor: 7800.60 },
    { categoria: 'Câmeras de Segurança', valor: 15600.30 },
    { categoria: 'Tablets', valor: 4200.90 },
    { categoria: 'Smartphones', valor: 6800.15 }
  ];

  ngOnInit(): void {
    // Define data inicial como primeiro dia do mês atual
    const hoje = new Date();
    const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
    this.filtroReceitas.dataInicial = primeiroDia.toISOString().split('T')[0];
    
    // Define data final como hoje
    this.filtroReceitas.dataFinal = hoje.toISOString().split('T')[0];

    // Inicializa os dados dos relatórios
    this.relatorios = [
      {
        titulo: 'Receitas por Período',
        periodo: this.obterPeriodoFormatado(),
        tipo: 'Agrupado por dia',
        filtros: 'Data inicial e final',
        status: 'Disponível',
        formato: 'PDF',
        id: 'RF019',
        icon: 'trending_up',
        botaoTexto: 'Gerar Relatório',
        botaoIcone: 'picture_as_pdf',
        temFiltros: true
      },
      {
        titulo: 'Receitas por Categoria',
        periodo: 'Desde sempre',
        tipo: 'Agrupado por categoria',
        filtros: 'Nenhum',
        status: 'Disponível',
        formato: 'PDF',
        id: 'RF020',
        icon: 'category',
        botaoTexto: 'Gerar Relatório',
        botaoIcone: 'picture_as_pdf',
        temFiltros: false
      }
    ];
  }

  /**
   * Método chamado pelo componente de card de relatório
   */
  onGerarRelatorio(filtros: FiltroReceitas, relatorioId: string): void {
    // Atualiza os filtros com os valores do card
    this.filtroReceitas = { ...filtros };
    
    // Chama o método apropriado baseado no ID do relatório
    if (relatorioId === 'RF019') {
      this.gerarRelatorioReceitas();
    } else if (relatorioId === 'RF020') {
      this.gerarRelatorioCategorias();
    }
  }

  /**
   * Gera relatório de receitas por período (RF019)
   */
  gerarRelatorioReceitas(): void {
    this.gerandoRelatorio = true;
    
    // Simula delay de processamento
    setTimeout(() => {
      const dadosFiltrados = this.filtrarDadosPorPeriodo();
      const totalGeral = dadosFiltrados.reduce((total, item) => total + item.valor, 0);
      
      this.relatorioAtual = {
        titulo: 'Receitas por Período',
        tipo: 'receitas',
        periodo: this.obterPeriodoFormatado(),
        dataGeracao: this.obterDataAtualFormatada(),
        totalGeral: totalGeral,
        dados: dadosFiltrados
      };
      
      this.modalRelatorioAberto = true;
      this.gerandoRelatorio = false;
    }, 1500);
  }

  /**
   * Gera relatório de receitas por categoria (RF020)
   */
  gerarRelatorioCategorias(): void {
    this.gerandoRelatorio = true;
    
    // Simula delay de processamento
    setTimeout(() => {
      const totalGeral = this.dadosCategoriasSimulados.reduce((total, item) => total + item.valor, 0);
      
      this.relatorioAtual = {
        titulo: 'Receitas por Categoria',
        tipo: 'categorias',
        periodo: 'Desde sempre',
        dataGeracao: this.obterDataAtualFormatada(),
        totalGeral: totalGeral,
        dados: [...this.dadosCategoriasSimulados]
      };
      
      this.modalRelatorioAberto = true;
      this.gerandoRelatorio = false;
    }, 1500);
  }

  /**
   * Gera todos os relatórios (ação do botão do header)
   */
  gerarTodosRelatorios(): void {
    this.gerandoRelatorio = true;
    
    // Simula delay de processamento
    setTimeout(() => {
      // Gera relatório combinado com ambos os tipos
      const dadosReceitas = this.filtrarDadosPorPeriodo();
      const totalReceitas = dadosReceitas.reduce((total, item) => total + item.valor, 0);
      const totalCategorias = this.dadosCategoriasSimulados.reduce((total, item) => total + item.valor, 0);
      const totalGeral = totalReceitas + totalCategorias;
      
      this.relatorioAtual = {
        titulo: 'Relatório Completo',
        tipo: 'receitas', // Usa o tipo receitas para exibição
        periodo: this.obterPeriodoFormatado(),
        dataGeracao: this.obterDataAtualFormatada(),
        totalGeral: totalGeral,
        dados: [...dadosReceitas, ...this.dadosCategoriasSimulados]
      };
      
      this.modalRelatorioAberto = true;
      this.gerandoRelatorio = false;
    }, 2000);
  }

  /**
   * Filtra dados de receitas por período selecionado
   */
  private filtrarDadosPorPeriodo(): DadoRelatorio[] {
    if (!this.filtroReceitas.dataInicial && !this.filtroReceitas.dataFinal) {
      return [...this.dadosReceitasSimulados];
    }

    const dataInicial = this.filtroReceitas.dataInicial ? new Date(this.filtroReceitas.dataInicial) : null;
    const dataFinal = this.filtroReceitas.dataFinal ? new Date(this.filtroReceitas.dataFinal) : null;

    return this.dadosReceitasSimulados.filter(item => {
      if (!item.data) return false;
      
      const itemData = this.converterStringParaData(item.data);
      
      if (dataInicial && itemData < dataInicial) return false;
      if (dataFinal && itemData > dataFinal) return false;
      
      return true;
    });
  }

  /**
   * Converte string de data DD/MM/YYYY para objeto Date
   */
  private converterStringParaData(dataString: string): Date {
    const [dia, mes, ano] = dataString.split('/');
    return new Date(parseInt(ano), parseInt(mes) - 1, parseInt(dia));
  }

  /**
   * Obtém período formatado para exibição
   */
  obterPeriodoFormatado(): string {
    if (!this.filtroReceitas.dataInicial && !this.filtroReceitas.dataFinal) {
      return 'Todos os períodos';
    }
    
    const dataInicial = this.filtroReceitas.dataInicial ? 
      this.formatarDataParaExibicao(this.filtroReceitas.dataInicial) : 'Início';
    const dataFinal = this.filtroReceitas.dataFinal ? 
      this.formatarDataParaExibicao(this.filtroReceitas.dataFinal) : 'Atual';
    
    return `${dataInicial} até ${dataFinal}`;
  }

  /**
   * Formata data YYYY-MM-DD para DD/MM/YYYY
   */
  private formatarDataParaExibicao(data: string): string {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  }

  /**
   * Obtém data atual formatada
   */
  private obterDataAtualFormatada(): string {
    const agora = new Date();
    const dia = agora.getDate().toString().padStart(2, '0');
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
    const ano = agora.getFullYear();
    const hora = agora.getHours().toString().padStart(2, '0');
    const minuto = agora.getMinutes().toString().padStart(2, '0');
    
    return `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
  }

  /**
   * Fecha o modal de relatório
   */
  fecharModal(): void {
    this.modalRelatorioAberto = false;
    this.relatorioAtual = null;
  }

  /**
   * Simula download do PDF
   */
  baixarPDF(): void {
    // Simula download do PDF
    console.log('Gerando PDF do relatório:', this.relatorioAtual?.titulo);
    
    // Aqui seria implementada a lógica real de geração de PDF
    // Por exemplo, usando jsPDF ou similar
    
    alert('PDF gerado com sucesso! (Simulação)');
  }
}
