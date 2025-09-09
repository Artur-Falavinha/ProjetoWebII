// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatIconModule } from '@angular/material/icon';
// import { MatButtonModule } from '@angular/material/button';

// interface SolicitacaoManutencao {
//   descricaoEquipamento: string;
//   categoriaEquipamento: string;
//   descricaoDefeito: string;
//   dataHora: Date;
//   estado: 'ABERTA' | 'ORCAMENTO' | 'CONCLUIDA';
// }

// @Component({
//   selector: 'app-solicitacao-manutencao',
//   standalone: true,
//   imports: [
//     CommonModule,
//     FormsModule,
//     RouterModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatSelectModule,
//     MatIconModule,
//     MatButtonModule
//   ],
//   templateUrl: './solicitacao.component.html',
//   styleUrls: ['./solicitacao.component.scss'],
// })
// export class SolicitacaoManutencaoComponent {
//   solicitacoes: SolicitacaoManutencao[] = [];
//   filtroEstado: string = 'TODAS';
//   editandoIndex: number | null = null;

//   novaSolicitacao: SolicitacaoManutencao = {
//     descricaoEquipamento: '',
//     categoriaEquipamento: '',
//     descricaoDefeito: '',
//     dataHora: new Date(),
//     estado: 'ABERTA'
//   };

//   constructor() {
//     this.carregarLocalStorage();
//   }

//   registrarSolicitacao() {
//     this.novaSolicitacao.dataHora = new Date();
//     if (this.editandoIndex !== null) {
//       this.solicitacoes[this.editandoIndex] = { ...this.novaSolicitacao };
//       this.editandoIndex = null;
//       alert('Solicitação atualizada!');
//     } else {
//       this.solicitacoes.push({ ...this.novaSolicitacao });
//       alert('Solicitação registrada com sucesso!');
//     }
//     this.salvarLocalStorage();
//     this.cancelarSolicitacao();
//   }

//   editarSolicitacao(index: number) {
//     this.novaSolicitacao = { ...this.solicitacoes[index] };
//     this.editandoIndex = index;
//   }

//   excluirSolicitacao(index: number) {
//     if (confirm('Deseja excluir esta solicitação?')) {
//       this.solicitacoes.splice(index, 1);
//       this.salvarLocalStorage();
//     }
//   }

//   filtrarSolicitacoes() {
//     if (this.filtroEstado === 'TODAS') return this.solicitacoes;
//     return this.solicitacoes.filter(s => s.estado === this.filtroEstado);
//   }

//   contarPorEstado(estado: string) {
//     return this.solicitacoes.filter(s => s.estado === estado).length;
//   }

//   ordenarPorData() {
//     this.solicitacoes.sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());
//   }

//   salvarLocalStorage() {
//     localStorage.setItem('solicitacoes', JSON.stringify(this.solicitacoes));
//   }

//   carregarLocalStorage() {
//     const dados = localStorage.getItem('solicitacoes');
//     if (dados) {
//       this.solicitacoes = JSON.parse(dados).map((s: any) => ({
//         ...s,
//         dataHora: new Date(s.dataHora)
//       }));
//     }
//   }

//   cancelarSolicitacao() {
//     this.novaSolicitacao = {
//       descricaoEquipamento: '',
//       categoriaEquipamento: '',
//       descricaoDefeito: '',
//       dataHora: new Date(),
//       estado: 'ABERTA'
//     };
//     this.editandoIndex = null;
//   }
// }

// export class SolicitacaoManutencaoComponent {
//   solicitacoes: SolicitacaoManutencao[] = [];
//   filtroEstado: string = 'TODAS';
//   editandoIndex: number | null = null;
//   lastUpdated: Date | null = null;
//   modoCompacto: boolean = false;
//   limiteSolicitacoes: number = 100;

//   // ...

//   registrarSolicitacao() {
//     if (this.solicitacoes.length >= this.limiteSolicitacoes) {
//       alert('Limite de solicitações atingido!');
//       return;
//     }
//     if (this.existeDuplicada(this.novaSolicitacao)) {
//       alert('Solicitação já registrada!');
//       return;
//     }

//     this.novaSolicitacao.dataHora = new Date();
//     if (this.editandoIndex !== null) {
//       this.solicitacoes[this.editandoIndex] = { ...this.novaSolicitacao };
//       this.editandoIndex = null;
//     } else {
//       this.solicitacoes.push({ ...this.novaSolicitacao });
//     }
//     this.lastUpdated = new Date();
//     this.salvarLocalStorage();
//     this.cancelarSolicitacao();
//   }

//   clonarSolicitacao(index: number) {
//     const copia = { ...this.solicitacoes[index], dataHora: new Date() };
//     this.solicitacoes.push(copia);
//     this.salvarLocalStorage();
//   }

//   existeDuplicada(s: SolicitacaoManutencao): boolean {
//     return this.solicitacoes.some(
//       x => x.descricaoEquipamento === s.descricaoEquipamento &&
//            x.descricaoDefeito === s.descricaoDefeito
//     );
//   }

//   contarCategorias() {
//     return new Set(this.solicitacoes.map(s => s.categoriaEquipamento)).size;
//   }

//   maisRecente() {
//     return this.solicitacoes.reduce((a, b) => a.dataHora > b.dataHora ? a : b, this.solicitacoes[0]);
//   }

//   maisAntiga() {
//     return this.solicitacoes.reduce((a, b) => a.dataHora < b.dataHora ? a : b, this.solicitacoes[0]);
//   }

//   get temSolicitacoes() {
//     return this.solicitacoes.length > 0;
//   }
// }