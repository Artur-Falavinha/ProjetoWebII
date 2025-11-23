import { Component, ViewChild, EventEmitter, Output, Input, OnInit } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from '@/app/lib/components/molecules/modal/modal.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-funcionario-form',
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
    MatIconModule,
    ModalComponent,
    NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss'
})
export class FuncionarioFormComponent implements OnInit {

  @Output() close = new EventEmitter<void>();
  @Input() funcionarioId?: number;
  @Input() isEditMode: boolean = false;
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

  dataNascimentoDisplay: string = '';
  dataAdmissaoDisplay: string = '';

  erroEmail: string = '';
  erroGeral: string = '';

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
  ) { }

  ngOnInit(): void {
    if (this.isEditMode && this.funcionarioId) {
      this.carregarFuncionario();
    }
  }

  carregarFuncionario(): void {
    if (!this.funcionarioId) return;

    this.funcionarioService.buscaPorId(this.funcionarioId).subscribe({
      next: (funcionarioEncontrado) => {
        if (funcionarioEncontrado) {
          this.funcionario = { ...funcionarioEncontrado };

          this.dataNascimentoDisplay = this.convertISOToDisplay(funcionarioEncontrado.dataNascimento);
          this.dataAdmissaoDisplay = this.convertISOToDisplay(funcionarioEncontrado.dataAdmissao);
        } else {
          this.erroGeral = 'Funcionário não encontrado.';
        }
      },
      error: (err) => {
        this.erroGeral = `[${err.status}] ${err.message}`;
      }
    });
  }

  convertISOToDisplay(dateString: string): string {
    if (!dateString) return '';

    if (dateString.includes('/') && dateString.length === 10) {
      return dateString;
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
  }

  convertDisplayToISO(displayDate: string): string {
    if (!displayDate) return '';

    if (displayDate.length === 8) {
      const day = displayDate.substring(0, 2);
      const month = displayDate.substring(2, 4);
      const year = displayDate.substring(4, 8);
      return `${day}/${month}/${year}`;
    }

    if (displayDate.length === 10 && displayDate.includes('/')) {
      return displayDate;
    }

    return '';
  }

  onFormSubmit(): void {
    this.limparErros();

    if (!this.dataNascimentoDisplay) {
      this.exibirErro('A data de nascimento é obrigatória e deve estar no formato DD/MM/AAAA.');
      return;
    }

    if (!this.dataAdmissaoDisplay) {
      this.exibirErro('A data de admissão é obrigatória e deve estar no formato DD/MM/AAAA.');
      return;
    }

    if (!this.formFuncionario.form.valid) {
      this.exibirErro('Por favor, preencha todos os campos obrigatórios corretamente.');
      return;
    }

    this.funcionario.dataNascimento = this.convertDisplayToISO(this.dataNascimentoDisplay);
    this.funcionario.dataAdmissao = this.convertDisplayToISO(this.dataAdmissaoDisplay);

    if (this.isEditMode) {
      this.funcionarioService.atualizar(this.funcionario).subscribe({
        next: (resp) => {
          if (resp) {
            this.close.emit();
          } else {
            this.exibirErro('Erro ao atualizar funcionário.');
          }
        },
        error: (err) => {
          this.exibirErro(`[${err.status}] ${err.message}`);
        }
      });

    } else {
      this.funcionarioService.inserir(this.funcionario).subscribe({
        next: (resp) => {
          if (resp) {
            this.close.emit();
          } else {
            this.exibirErro('Erro ao inserir funcionário.');
          }
        },
        error: (err) => {
          this.exibirErro(`[${err.status}] ${err.message}`);
        }
      });
    }
  }

  limparErros(): void {
    this.erroEmail = '';
    this.erroGeral = '';
  }

  exibirErro(texto: string): void {
    if (texto.toLowerCase().includes('email')) {
      this.erroEmail = texto;
    } else {
      this.erroGeral = texto;
    }
  }

  onFormClose(): void {
    this.close.emit();
  }

  get modalTitle(): string {
    return this.isEditMode ? 'Editar Funcionário' : 'Adicionar Novo Funcionário';
  }

  get modalDescription(): string {
    return this.isEditMode ? 'Atualize as informações do funcionário' : 'Cadastre um novo funcionário no sistema';
  }

  get submitButtonText(): string {
    return this.isEditMode ? 'Salvar Alterações' : 'Adicionar';
  }

  get isFormValid(): boolean {
    return this.formFuncionario?.form?.valid || false;
  }
}
