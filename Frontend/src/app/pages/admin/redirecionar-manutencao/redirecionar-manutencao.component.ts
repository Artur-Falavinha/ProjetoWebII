import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderRequest, SituationEnum, FuncionarioRequest } from '@/app/@types';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { FuncionarioService } from '@/app/lib/services/funcionario/funcionario.service';
import {
  ButtonComponent,
  SidebarComponent,
  TextAreaInputComponent,
  SelectInputComponent,
} from '@/app/lib/components';
import { AuthService } from '@/app/lib/services';


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
    SelectInputComponent,
  ],
  templateUrl: './redirecionar-manutencao.component.html',
  styleUrl: './redirecionar-manutencao.component.scss',
})
export class RedirecionarManutencaoComponent implements OnInit {
  solicitacao$!: Observable<OrderRequest | undefined>;
  funcionariosOptions$!: Observable<{ value: number; label: string }[]>;
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
    this.solicitacao$ = this.solicitacaoService.buscaPorId(id);
    this.solicitacaoService.buscaPorId(id).subscribe((solicitacao) => {
      if (
        !solicitacao ||
        (solicitacao.situation !== SituationEnum.APROVADA &&
          solicitacao.situation !== SituationEnum.REDIRECIONADA)
      ) {
        this.router.navigate(['/admin/solicitacoes']);
      }
    });

    this.funcionariosOptions$ = this.funcionarioService.listarAsFormOptions();

    this.redirecionarForm = this.fb.group({
      funcionario: ['', Validators.required],
      observacao: ['', Validators.maxLength(300)],
    });
  }

  get funcionarioControl() {
    return this.redirecionarForm.get('funcionario') as FormControl;
  }

  onSubmit(): void {
    if (this.redirecionarForm.invalid) {
      this.redirecionarForm.markAllAsTouched();
      return;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.solicitacaoService
      .redirecionar({
        id,
        funcionarioDestinoId: this.funcionarioControl.value,
      })
      .subscribe({
        next: (result) => {
          if (result) {
            this.snackBar.open('Orçamento redirecionado com Sucesso', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-success'],
            });
            this.router.navigate(['/admin/solicitacoes']);
          } else {
            this.snackBar.open('Erro ao redirecionar', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-error'],
            });
          }
        },
        error: (err) => {
          this.snackBar.open(err ? err : 'Erro ao redirecionar', 'OK', {
            duration: 5000,
            panelClass: ['snackbar-error'],
          });
        },
      });
  }

  cancelar(): void {
    this.router.navigate(['/admin/solicitacoes']);
  }
}
