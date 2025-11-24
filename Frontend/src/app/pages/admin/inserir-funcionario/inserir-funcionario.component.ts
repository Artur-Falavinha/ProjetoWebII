import { Component, ViewChild, EventEmitter, Output, OnInit } from '@angular/core';
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
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ButtonComponent } from '@/app/lib/components/atoms/button/button.component';

@Component({
  selector: 'app-inserir-funcionario',
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
    ButtonComponent
  ],
  providers: [provideNgxMask()],
  templateUrl: './inserir-funcionario.component.html',
  styleUrl: './inserir-funcionario.component.scss'
})
export class InserirFuncionarioComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  @ViewChild('formFuncionario') formFuncionario!: NgForm;

  funcionario: FuncionarioRequest = {
    id: 0,
    nome: '',
    email: '',
    dataNascimento: '',
    senha: '',
    cargo: '',
    telefone: '',
    dataAdmissao: '',
    ativo: true
  };

  // Mensagens
  erroGeral: string = '';
  erroDataNascimento: string = '';
  erroDataAdmissao: string = '';
  showErrorDataNascimento: boolean = false;
  showErrorDataAdmissao: boolean = false;

  // Datas para exibição
  dataNascimentoDisplay: string = '';
  dataAdmissaoDisplay: string = '';

  // Primeiro funcionário
  isPrimeiroFuncionario: boolean = false;

  cargos = [
    'Técnico de Manutenção',
    'Supervisor',
    'Gerente',
    'Administrador',
    'Auxiliar'
  ];

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {
    this.funcoesPrimeiroFuncionario();
  }

  ngOnInit(): void { }

  private funcoesPrimeiroFuncionario(): void {
    this.funcionarioService.listarTodas().subscribe({
      next: (lista) => {
        this.isPrimeiroFuncionario = !lista || lista.length === 0;

        if (this.isPrimeiroFuncionario) {
          this.funcionario.cargo = 'Administrador';
        }
      }
    });
  }

  /**Converte data DD/MM/YYYY para formato DD/MM/YYYY (mantém formato)**/
  convertDisplayToISO(displayDate: string): string {
    if (!displayDate) return '';

    if (displayDate.length === 8) {
      const d = displayDate.substring(0, 2);
      const m = displayDate.substring(2, 4);
      const a = displayDate.substring(4, 8);
      return `${d}/${m}/${a}`;
    }

    return displayDate;
  }

  inserir(): void {
    // Reset mensagens
    this.erroGeral = '';
    this.erroDataNascimento = '';
    this.erroDataAdmissao = '';
    this.showErrorDataNascimento = false;
    this.showErrorDataAdmissao = false;

    // Conversão de datas
    if (this.dataNascimentoDisplay) {
      this.funcionario.dataNascimento = this.convertDisplayToISO(this.dataNascimentoDisplay);
    }
    if (this.dataAdmissaoDisplay) {
      this.funcionario.dataAdmissao = this.convertDisplayToISO(this.dataAdmissaoDisplay);
    }

    // Validações
    if (this.isPrimeiroFuncionario) {
      if (!this.funcionario.nome || !this.funcionario.email || !this.funcionario.senha) {
        this.erroGeral = 'Nome, email e senha são obrigatórios para o primeiro funcionário.';
        return;
      }
    } else {
      if (!this.dataNascimentoDisplay) {
        this.erroDataNascimento = 'A data de nascimento é obrigatória.';
        this.showErrorDataNascimento = true;
      }

      if (!this.dataAdmissaoDisplay) {
        this.erroDataAdmissao = 'A data de admissão é obrigatória.';
        this.showErrorDataAdmissao = true;
      }

      if (this.showErrorDataNascimento || this.showErrorDataAdmissao) {
        return;
      }
    }

    // Chamada ao backend (INTEGRAÇÃO)
    this.funcionarioService.inserir(this.funcionario).subscribe({
      next: (resp) => {
        if (resp) {
          this.close.emit();
        }
      },
      error: (err) => {
        this.erroGeral = `[${err.status}] ${err.message}`;
      }
    });
  }

  closeModal(): void {
    this.close.emit();
  }
}
