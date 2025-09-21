import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';
import { StatCardComponent } from '@/app/lib/components/molecules/stat-card/stat-card.component';
import { SolicitacaoCardComponent as SolicitacaoCardNewComponent } from '@/app/lib/components/molecules/solicitacao-card/solicitacao-card.component';
import { ModalComponent } from '@/app/lib/components/molecules/modal/modal.component';
import { AuthService } from '@/app/lib/services/auth/auth.service';
import { Solicitacao } from '@/app/shared/models/solicitacao.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Router } from '@angular/router';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-solicitacoes-component', 
  standalone: true,           
  imports: [
    CommonModule,              
    SidebarComponent,
    StatCardComponent,
    SolicitacaoCardNewComponent,
    ModalComponent,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './listar-solicitacoes.component.html',
  styleUrls: ['./listar-solicitacoes.component.scss']
})
export class ListarSolicitacoesComponent implements OnInit {
  solicitacoes: Solicitacao[] = [];
  router: any;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.solicitacoes = this.listarTodas();
  }

  listarTodas(): Solicitacao[] {
    return this.solicitacaoService.listarTodas();
  }

  /**Modal de detalhes**/
  modalAberto = false;
  solicitacaoSelecionada: Solicitacao | null = null;


  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  }

  formatarDataSimples(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(data);
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'ABERTA': return 'status-aberta';
      case 'ORCADA': return 'status-orcada';
      case 'APROVADA': return 'status-aprovada';
      case 'FINALIZADA': return 'status-finalizada';
      default: return 'status-aberta';
    }
  }

  getStatusText(status: string): string {
    switch(status) {
      case 'ABERTA': return 'Aberta';
      case 'ORCADA': return 'Orçada';
      case 'APROVADA': return 'Aprovada';
      case 'FINALIZADA': return 'Finalizada';
      default: return 'Aberta';
    }
  }

  verDetalhes(solicitacao: Solicitacao): void {
    this.solicitacaoSelecionada = solicitacao;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.solicitacaoSelecionada = null;
  }

  efetuarOrcamento(solicitacao: Solicitacao): void {
    this.router.navigate(['/admin/orcamento', solicitacao.id]);
  }

}