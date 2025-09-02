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

    // Material
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './solicitacao.html',
  styleUrls: ['./solicitacao.scss'],
})
export class SolicitacaoManutencaoComponent {
  solicitacoes: SolicitacaoManutencao[] = [];

  novaSolicitacao: SolicitacaoManutencao = {
    descricaoEquipamento: '',
    categoriaEquipamento: '',
    descricaoDefeito: '',
    dataHora: new Date(),
    estado: 'ABERTA'
  };

  registrarSolicitacao() {
    this.novaSolicitacao.dataHora = new Date();
    this.novaSolicitacao.estado = 'ABERTA';
    this.solicitacoes.push({ ...this.novaSolicitacao });

    alert('Solicitação registrada com sucesso!');
    this.cancelarSolicitacao();
  }

  cancelarSolicitacao() {
    this.novaSolicitacao = {
      descricaoEquipamento: '',
      categoriaEquipamento: '',
      descricaoDefeito: '',
      dataHora: new Date(),
      estado: 'ABERTA'
    };
  }
}
