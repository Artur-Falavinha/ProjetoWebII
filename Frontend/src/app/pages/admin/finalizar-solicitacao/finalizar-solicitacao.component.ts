import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { SidebarComponent } from '@/app/lib/components';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-finalizar-solicitacao',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent,
    MatIcon,
    MatButton,
  ],
  templateUrl: './finalizar-solicitacao.component.html',
  styleUrls: ['./finalizar-solicitacao.component.scss'],
})
export class FinalizarSolicitacaoComponent implements OnInit {
  solicitacaoSelecionada: OrderRequest | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.solicitacaoSelecionada = this.solicitacaoService.buscaPorId(id);

      if (!this.solicitacaoSelecionada) {
        alert('Solicitação não encontrada!');
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
