import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { SidebarComponent } from '@/app/lib/components';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { AuthService } from '@/app/lib/services';

@Component({
  selector: 'app-efetuar-orcamento',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent,
    MatIcon,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatError
  ],
  templateUrl: './efetuar-orcamento.component.html',
  styleUrls: ['./efetuar-orcamento.component.scss'],
})
export class EfetuarOrcamentoComponent implements OnInit {
  solicitacaoSelecionada: OrderRequest | undefined;
  orcamentoForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.solicitacaoSelecionada = this.solicitacaoService.buscaPorId(id);

      if (!this.solicitacaoSelecionada) {
        alert('Solicitação não encontrada!');
        this.router.navigate(['admin/solicitacoes']);
      } else {
        this.orcamentoForm = this.fb.group({
          valor: [this.solicitacaoSelecionada.price ?? '', [Validators.required, Validators.min(0.01)]]
        });
      }
    }

    if (!(this.solicitacaoSelecionada?.situation == SituationEnum.ORCADA)) {
      this.router.navigate(['/admin'])
    }
  }

  get valorControl() {
    return this.orcamentoForm.get('valor') as FormControl;
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

  salvarOrcamento(): void {
    if (!this.solicitacaoSelecionada || this.orcamentoForm.invalid) {
      this.orcamentoForm?.markAllAsTouched();
      return;
    }

    const valor = this.valorControl.value;
    if (!valor || valor <= 0) {
      alert('Informe um valor válido para o orçamento');
      return;
    }

    const employee = this.authService.getCurrentUser();

    this.solicitacaoSelecionada.price = valor;
    this.solicitacaoSelecionada.situation = SituationEnum.ORCADA;
    this.solicitacaoSelecionada.atributed_employee = employee?.name;

    this.solicitacaoService.atualizar(this.solicitacaoSelecionada);
    alert('Orçamento salvo com sucesso!');
    this.router.navigate(['admin/solicitacoes']);
  }

  cancelar(): void {
    this.router.navigate(['admin/solicitacoes']);
  }
}
