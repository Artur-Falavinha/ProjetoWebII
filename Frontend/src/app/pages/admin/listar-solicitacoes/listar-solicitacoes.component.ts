import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';
import { SolicitacaoCardComponent as SolicitacaoCardNewComponent } from '@/app/lib/components/molecules/solicitacao-card/solicitacao-card.component';
import { AuthService } from '@/app/lib/services/auth/auth.service';
import { SituationEnum, OrderRequest } from '@/app/@types';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { Router, RouterModule } from '@angular/router';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TagComponent } from '@/app/lib/components';
import { ApproveComponent } from "../../client/approve/approve.component";

@Component({
  selector: 'app-solicitacoes-component',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    SolicitacaoCardNewComponent,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    TagComponent,
    ApproveComponent
],
  templateUrl: './listar-solicitacoes.component.html',
  styleUrls: ['./listar-solicitacoes.component.scss'],
})
export class ListarSolicitacoesComponent implements OnInit {
  solicitacoes: OrderRequest[] = [];
  SituationEnum = SituationEnum;

  constructor(
    private solicitacaoService: SolicitacaoService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.router = router;
  }

  ngOnInit(): void {
    this.solicitacoes = this.listarTodas();
  }

  listarTodas(): OrderRequest[] {
    return this.solicitacaoService.listarTodas();
  }

  /**Modal de detalhes**/
  modalAberto = false;
  solicitacaoSelecionada: OrderRequest | null = null;

  getStatusClass(status: SituationEnum): string {
    switch (status) {
      case SituationEnum.ABERTA:
        return 'status-aberta';
      case SituationEnum.ORCADA:
        return 'status-orcada';
      case SituationEnum.APROVADA:
        return 'status-aprovada';
      case SituationEnum.FINALIZADA:
        return 'status-finalizada';
      default:
        return 'status-aberta';
    }
  }

  getStatusText(status: SituationEnum): string {
    switch (status) {
      case SituationEnum.ABERTA:
        return 'Aberta';
      case SituationEnum.ORCADA:
        return 'Orçada';
      case SituationEnum.APROVADA:
        return 'Aprovada';
      case SituationEnum.FINALIZADA:
        return 'Finalizada';
      default:
        return 'Aberta';
    }
  }

  verDetalhes(solicitacao: OrderRequest): void {
    this.solicitacaoSelecionada = solicitacao;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.solicitacaoSelecionada = null;
  }
}
