import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { ApproveComponent } from "../../client/approve/approve.component";
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonComponent } from '@/app/lib/components';
import { Subject, takeUntil } from 'rxjs';

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
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ButtonComponent
],
  templateUrl: './listar-solicitacoes.component.html',
  styleUrls: ['./listar-solicitacoes.component.scss'],
})
export class ListarSolicitacoesComponent implements OnInit, OnDestroy {
  solicitacoes: OrderRequest[] = [];
  todasSolicitacoes: OrderRequest[] = [];
  SituationEnum = SituationEnum;
  filterForm!: FormGroup;
  filtroAtivo: string = 'TODAS';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private solicitacaoService: SolicitacaoService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.router = router;
  }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      dataInicio: [null],
      dataFim: [null]
    });
    
    this.solicitacaoService.listarTodas()
      .pipe(takeUntil(this.destroy$))
      .subscribe((solicitacoes) => {
        this.todasSolicitacoes = this.prepararSolicitacoes(solicitacoes);
        this.aplicarFiltro(this.filtroAtivo);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private prepararSolicitacoes(solicitacoes: OrderRequest[]): OrderRequest[] {
    const user = this.authService.getCurrentUser();
    return solicitacoes
      .filter(s => {
        if (s.situation === SituationEnum.REDIRECIONADA) {
          return s.funcionario === user?.name;
        }
        return true;
      })
      .sort((a, b) => {
        const dateA = a.dataCriacao ? new Date(a.dataCriacao).getTime() : 0;
        const dateB = b.dataCriacao ? new Date(b.dataCriacao).getTime() : 0;
        return dateA - dateB;
      });
  }

  aplicarFiltro(tipo: string): void {
    this.filtroAtivo = tipo;
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    switch (tipo) {
      case 'HOJE':
        this.solicitacoes = this.todasSolicitacoes.filter(s => {
          if (!s.dataCriacao) return false;
          const dataSolicitacao = this.parseDate(s.dataCriacao);
          dataSolicitacao.setHours(0, 0, 0, 0);
          return dataSolicitacao.getTime() === hoje.getTime();
        });
        break;
      case 'TODAS':
        this.solicitacoes = [...this.todasSolicitacoes];
        break;
      case 'ABERTA':
        this.solicitacoes = this.todasSolicitacoes.filter(s => s.situation === SituationEnum.ABERTA);
        break;
    }
  }

  filtrarPorPeriodo(): void {
    const dataInicio = this.filterForm.get('dataInicio')?.value;
    const dataFim = this.filterForm.get('dataFim')?.value;

    if (!dataInicio || !dataFim) return;

    this.filtroAtivo = 'PERIODO';
    this.solicitacoes = this.todasSolicitacoes.filter(s => {
      if (!s.dataCriacao) return false;
      const dataSolicitacao = this.parseDate(s.dataCriacao);
      return dataSolicitacao >= dataInicio && dataSolicitacao <= dataFim;
    });
  }

  parseDate(dateStr: string): Date {
    const parts = dateStr.split(' ')[0].split('/');
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
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


  getButtonStatus(solicitacao: OrderRequest): void {
    this.solicitacaoSelecionada = solicitacao;

    switch (solicitacao.situation) {
      case SituationEnum.ABERTA:
        this.router.navigate(['/admin/orcamento', solicitacao.id]);  
        break;
      case SituationEnum.APROVADA:
        this.router.navigate(['/admin/manutencao', solicitacao.id]);
        break;
      case SituationEnum.PAGA:
        this.router.navigate(['/admin/finalizar', solicitacao.id]);
        break;
      default:
        this.modalAberto = true; 
        break; 
    }
  }


  verDetalhes(solicitacao: OrderRequest) {
    this.solicitacaoSelecionada = solicitacao;
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
    this.solicitacaoSelecionada = null;
  }
}
