import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

interface SolicitacaoManutencao {
  descricaoEquipamento: string;
  categoriaEquipamento: string;
  descricaoDefeito: string;
  dataHora: Date;
  estado: 'ABERTA' | 'ORCAMENTO' | 'CONCLUIDA';
}

@Component({
  selector: 'app-solicitacao-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.scss'],
})
export class SolicitacaoManutencaoComponent {
  // Propriedades principais para gerenciamento de solicitações
  solicitacoes: SolicitacaoManutencao[] = [];
  filtroEstado: string = 'TODAS';
  editandoIndex: number | null = null;
  lastUpdated: Date | null = null;
  modoCompacto: boolean = false;
  limiteSolicitacoes: number = 100;

  // Objeto para nova solicitação com valores padrão
  novaSolicitacao: SolicitacaoManutencao = {
    descricaoEquipamento: '',
    categoriaEquipamento: '',
    descricaoDefeito: '',
    dataHora: new Date(),
    estado: 'ABERTA'
  };

  constructor() {
    this.carregarLocalStorage();
  }

  // Método para registrar nova solicitação ou atualizar existente
  registrarSolicitacao() {
    // Verifica se atingiu o limite de solicitações
    if (this.solicitacoes.length >= this.limiteSolicitacoes) {
      alert('Limite de solicitações atingido!');
      return;
    }
    
    // Verifica se já existe solicitação duplicada
    if (this.existeDuplicada(this.novaSolicitacao)) {
      alert('Solicitação já registrada!');
      return;
    }

    // Atualiza data/hora da solicitação
    this.novaSolicitacao.dataHora = new Date();
    
    // Se está editando, atualiza a solicitação existente
    if (this.editandoIndex !== null) {
      this.solicitacoes[this.editandoIndex] = { ...this.novaSolicitacao };
      this.editandoIndex = null;
      alert('Solicitação atualizada!');
    } else {
      // Senão, adiciona nova solicitação
      this.solicitacoes.push({ ...this.novaSolicitacao });
      alert('Solicitação registrada com sucesso!');
    }
    
    // Atualiza timestamp e salva no localStorage
    this.lastUpdated = new Date();
    this.salvarLocalStorage();
    this.cancelarSolicitacao();
  }

  // Método para editar uma solicitação existente
  editarSolicitacao(index: number) {
    this.novaSolicitacao = { ...this.solicitacoes[index] };
    this.editandoIndex = index;
  }

  // Método para excluir uma solicitação
  excluirSolicitacao(index: number) {
    if (confirm('Deseja excluir esta solicitação?')) {
      this.solicitacoes.splice(index, 1);
      this.salvarLocalStorage();
    }
  }

  // Método para clonar uma solicitação existente
  clonarSolicitacao(index: number) {
    const copia = { ...this.solicitacoes[index], dataHora: new Date() };
    this.solicitacoes.push(copia);
    this.salvarLocalStorage();
  }

  // Método para filtrar solicitações por estado
  filtrarSolicitacoes() {
    if (this.filtroEstado === 'TODAS') return this.solicitacoes;
    return this.solicitacoes.filter(s => s.estado === this.filtroEstado);
  }

  // Método para contar solicitações por estado
  contarPorEstado(estado: string) {
    return this.solicitacoes.filter(s => s.estado === estado).length;
  }

  // Método para ordenar solicitações por data
  ordenarPorData() {
    this.solicitacoes.sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());
  }

  // Método para verificar se existe solicitação duplicada
  existeDuplicada(s: SolicitacaoManutencao): boolean {
    return this.solicitacoes.some(
      x => x.descricaoEquipamento === s.descricaoEquipamento &&
           x.descricaoDefeito === s.descricaoDefeito
    );
  }

  // Método para contar categorias únicas
  contarCategorias() {
    return new Set(this.solicitacoes.map(s => s.categoriaEquipamento)).size;
  }

  // Método para obter solicitação mais recente
  maisRecente() {
    if (this.solicitacoes.length === 0) return null;
    return this.solicitacoes.reduce((a, b) => a.dataHora > b.dataHora ? a : b, this.solicitacoes[0]);
  }

  // Método para obter solicitação mais antiga
  maisAntiga() {
    if (this.solicitacoes.length === 0) return null;
    return this.solicitacoes.reduce((a, b) => a.dataHora < b.dataHora ? a : b, this.solicitacoes[0]);
  }

  // Getter para verificar se existem solicitações
  get temSolicitacoes() {
    return this.solicitacoes.length > 0;
  }

  // Método para salvar dados no localStorage
  salvarLocalStorage() {
    localStorage.setItem('solicitacoes', JSON.stringify(this.solicitacoes));
  }

  // Método para carregar dados do localStorage
  carregarLocalStorage() {
    const dados = localStorage.getItem('solicitacoes');
    if (dados) {
      this.solicitacoes = JSON.parse(dados).map((s: any) => ({
        ...s,
        dataHora: new Date(s.dataHora)
      }));
    }
  }

  // Método para cancelar edição e limpar formulário
  cancelarSolicitacao() {
    this.novaSolicitacao = {
      descricaoEquipamento: '',
      categoriaEquipamento: '',
      descricaoDefeito: '',
      dataHora: new Date(),
      estado: 'ABERTA'
    };
    this.editandoIndex = null;
  }
}