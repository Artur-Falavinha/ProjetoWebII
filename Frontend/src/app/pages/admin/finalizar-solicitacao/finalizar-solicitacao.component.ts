import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { FinishCardComponent } from '@/app/lib/components/molecules/finish-card/finish-card.component';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
// Importe os componentes/materials usados no template
import { MatIcon } from '@angular/material/icon';
import { MatLabel } from '@angular/material/form-field';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatError } from '@angular/material/form-field';
import { SidebarComponent } from '@/app/lib/components';

@Component({
  selector: 'app-finalizar-solicitacao',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    SidebarComponent,
  ],
  templateUrl: './finalizar-solicitacao.component.html',
  styleUrl: './finalizar-solicitacao.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinalizarSolicitacaoComponent implements OnInit {
  public items: OrderRequest[] = inject(SolicitacaoService).listarTodas();
  solicitacaoSelecionada: OrderRequest | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.solicitacaoSelecionada = this.solicitacaoService.buscaPorId(id);

      if (
        !this.solicitacaoSelecionada ||
        !(this.solicitacaoSelecionada.situation == SituationEnum.PAGA)
      ) {
        this.router.navigate(['admin/solicitacoes']);
      }
    }
  }

  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(data);
  }

  formatarDataSimples(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(data);
  }

  salvarfinalizar(): void {
    if (!this.solicitacaoSelecionada) {
      return;
    }

    this.solicitacaoSelecionada.situation = SituationEnum.FINALIZADA;

    this.solicitacaoService.atualizar(this.solicitacaoSelecionada);
    alert('Solicitação finalizada!');
    this.router.navigate(['admin/solicitacoes']);
  }

  cancelar(): void {
    this.router.navigate(['admin/solicitacoes']);
  }
}
