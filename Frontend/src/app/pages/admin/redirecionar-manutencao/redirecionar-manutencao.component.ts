import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderRequest, SituationEnum, FuncionarioRequest } from '@/app/@types';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { FuncionarioService } from '@/app/lib/services/funcionario/funcionario.service';
import { ButtonComponent, SidebarComponent, TextAreaInputComponent, SelectInputComponent } from '@/app/lib/components';
import { AuthService } from '@/app/lib/services';
import { getFormattedDate, getFormattedDateOnly, getFormattedTimeOnly } from '@/app/lib/utils/getDateFormatted';

@Component({
  selector: 'app-redirecionar-manutencao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    SidebarComponent,
    ButtonComponent,
    TextAreaInputComponent,
    SelectInputComponent
  ],
  templateUrl: './redirecionar-manutencao.component.html',
  styleUrl: './redirecionar-manutencao.component.scss'
})
export class RedirecionarManutencaoComponent implements OnInit {
  solicitacao?: OrderRequest;
  funcionarios: FuncionarioRequest[] = [];
  funcionariosOptions: { value: string; label: string }[] = [];
  redirecionarForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private solicitacaoService: SolicitacaoService,
    private funcionarioService: FuncionarioService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.solicitacao = this.solicitacaoService.buscaPorId(id);

    if (!this.solicitacao) {
      this.router.navigate(['admin/solicitacoes']);
      return;
    }

    if (this.solicitacao.situation !== SituationEnum.APROVADA && 
        this.solicitacao.situation !== SituationEnum.REDIRECIONADA) {
      this.router.navigate(['admin/solicitacoes']);
      return;
    }

    this.funcionarios = this.funcionarioService.listarTodas()
      .filter(f => f.nome !== this.solicitacao?.atributed_employee);

    this.funcionariosOptions = this.funcionarios.map(f => ({
      value: f.nome,
      label: f.nome
    }));

    this.redirecionarForm = this.fb.group({
      funcionario: ['', Validators.required],
      observacao: ['', Validators.maxLength(300)]
    });
  }

  get funcionarioControl() {
    return this.redirecionarForm.get('funcionario') as FormControl;
  }

  get observacaoControl() {
    return this.redirecionarForm.get('observacao') as FormControl;
  }

  onSubmit(): void {
    if (this.redirecionarForm.invalid) {
      this.redirecionarForm.markAllAsTouched();
      return;
    }

    const user = this.authService.getCurrentUser();
    const dataHora = getFormattedDate();
    const funcionarioOrigem = this.solicitacao!.atributed_employee;
    const funcionarioDestino = this.funcionarioControl.value;

    this.solicitacao!.atributed_employee = funcionarioDestino;
    this.solicitacao!.situation = SituationEnum.REDIRECIONADA;
    this.solicitacao!.observacoes = this.observacaoControl.value;

    if (!this.solicitacao!.history) {
      this.solicitacao!.history = [];
    }

    this.solicitacao!.history.push({
      action: SituationEnum.REDIRECIONADA,
      date: getFormattedDateOnly(),
      time: getFormattedTimeOnly(),
      description: `Redirecionado de ${funcionarioOrigem} para ${funcionarioDestino}${this.observacaoControl.value ? '. Motivo: ' + this.observacaoControl.value : ''}`,
      employee: funcionarioOrigem
    });

    this.solicitacaoService.atualizar(this.solicitacao!);

    this.snackBar.open('Manutenção Redirecionada com Sucesso', 'OK', {
      duration: 5000,
      panelClass: ['snackbar-success']
    });

    this.router.navigate(['/admin/solicitacoes']);
  }

  cancelar(): void {
    this.router.navigate(['/admin/solicitacoes']);
  }
}
