import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { OrderRequest } from "@/app/@types";
import { SolicitacaoService } from "@/app/lib/services/solicitacao/solicitacao.service";
import { SidebarComponent } from "@/app/lib/components";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel } from "@angular/material/form-field";

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [CommonModule, 
            FormsModule, 
            RouterModule,
            SidebarComponent,
            MatIcon,
            MatLabel,
            MatFormField
          ],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrls: ['./efetuar-orcamento.component.scss']
})
export class EfetuarOrcamentoComponent implements OnInit {

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

  salvarOrcamento(): void {
    if (!this.solicitacaoSelecionada) return;

    const valor = this.solicitacaoSelecionada.price;
    if (!valor || valor <= 0) {
      alert('Informe um valor válido para o orçamento');
      return;
    }

    this.solicitacaoService.atualizar(this.solicitacaoSelecionada);
    alert('Orçamento salvo com sucesso!');
    this.router.navigate(['admin/solicitacoes']);
  }

  cancelar(): void {
    this.router.navigate(['admin/solicitacoes']);
  }
}
