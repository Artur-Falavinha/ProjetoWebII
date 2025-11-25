import { Component, ViewChild, EventEmitter, Output, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FuncionarioRequest } from '@/app/@types';
import { FuncionarioService } from '@/app/lib/services/funcionario/funcionario.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-editar-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './editar-funcionario.component.html',
  styleUrl: './editar-funcionario.component.scss'
})
export class EditarFuncionarioComponent {

  @Output() close = new EventEmitter<void>();
  @ViewChild('formFuncionario') formFuncionario!: NgForm;

  funcionarioAntigo: any; // FuncionarioResponse
  funcionario: FuncionarioRequest;
  erroGeral: string = '';
  erroDataNascimento: string = '';
  erroDataAdmissao: string = '';
  showErrorDataNascimento: boolean = false;
  showErrorDataAdmissao: boolean = false;

  // Propriedades para o datepicker
  dataNascimento: Date | null = null;
  dataAdmissao: Date | null = null;

  /**Opções para o select de cargo**/
  cargos = [
    'Técnico de Manutenção',
    'Supervisor',
    'Gerente',
    'Administrador',
    'Auxiliar'
  ];

  // flag para desabilitar botão enquanto grava
  isSaving = false;

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: FuncionarioRequest
  ) {
    // Recebe FuncionarioResponse do buscarId
    this.funcionarioAntigo = { ...data };
    // Inicializa FuncionarioRequest para edição
    this.funcionario = {
      nome: this.funcionarioAntigo.nome,
      email: this.funcionarioAntigo.email,
      dataNascimento: this.funcionarioAntigo.dataNascimento,
      senha: this.funcionarioAntigo.senha,
      cargo: this.funcionarioAntigo.cargo,
      telefone: this.funcionarioAntigo.telefone,
      dataAdmissao: this.funcionarioAntigo.dataAdmissao
    };
    this.dataNascimento = this.funcionarioAntigo.dataNascimento ? new Date(this.funcionarioAntigo.dataNascimento) : null;
    this.dataAdmissao = this.funcionarioAntigo.dataAdmissao ? new Date(this.funcionarioAntigo.dataAdmissao) : null;
  }

  atualizar(): void {
    this.erroGeral = '';
    this.erroDataNascimento = '';
    this.erroDataAdmissao = '';
    this.showErrorDataNascimento = false;
    this.showErrorDataAdmissao = false;

    // Cria novo objeto FuncionarioRequest para envio
    const funcionarioNovo: FuncionarioRequest = {
      nome: this.funcionario.nome,
      email: this.funcionario.email,
      dataNascimento: this.dataNascimento ? this.dataNascimento.toISOString().slice(0, 10) : '',
      senha: this.funcionario.senha,
      cargo: this.funcionario.cargo,
      telefone: this.funcionario.telefone,
      dataAdmissao: this.dataAdmissao ? this.dataAdmissao.toISOString().slice(0, 10) : ''
    };

    if (!this.dataNascimento) {
      this.erroDataNascimento = 'A data de nascimento é obrigatória.';
      this.showErrorDataNascimento = true;
      return;
    }
    if (!this.dataAdmissao) {
      this.erroDataAdmissao = 'A data de admissão é obrigatória.';
      this.showErrorDataAdmissao = true;
      return;
    }
    if (!(funcionarioNovo.nome && funcionarioNovo.email && funcionarioNovo.dataNascimento && funcionarioNovo.dataAdmissao && funcionarioNovo.senha && funcionarioNovo.cargo)) {
      this.erroGeral = 'Por favor, preencha todos os campos obrigatórios corretamente.';
      return;
    }

    this.isSaving = true;
    this.funcionarioService.atualizar(this.funcionarioAntigo.id, funcionarioNovo).subscribe({
      next: (resp) => {
        this.isSaving = false;
        if (resp) {
          this.close.emit();
        } else {
          this.erroGeral = 'Erro ao atualizar funcionário (resposta inválida do servidor).';
        }
      },
      error: (err) => {
        this.isSaving = false;
        this.erroGeral = `[${err?.status ?? '000'}] ${err?.message ?? err}`;
      }
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}
