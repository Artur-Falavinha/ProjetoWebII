import { Component, ViewChild, EventEmitter, Output, Input, Inject } from '@angular/core';
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
  funcionario: FuncionarioRequest;
  erroGeral: string = '';
  erroDataNascimento: string = '';
  erroDataAdmissao: string = '';
  showErrorDataNascimento: boolean = false;
  showErrorDataAdmissao: boolean = false;
  
  // Propriedades para exibição das datas no formato DD/MM/YYYY
  dataNascimentoDisplay: string = '';
  dataAdmissaoDisplay: string = '';
  
  /**Opções para o select de cargo**/
  cargos = [
    'Técnico de Manutenção',
    'Supervisor',
    'Gerente',
    'Administrador',
    'Auxiliar'
  ];

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: FuncionarioRequest 
  ) {
    this.funcionario = { ...data };
    // Converte as datas para exibição
    this.dataNascimentoDisplay = this.convertISOToDisplay(this.funcionario.dataNascimento);
    this.dataAdmissaoDisplay = this.convertISOToDisplay(this.funcionario.dataAdmissao);
  }

  /**Converte data para formato DD/MM/YYYY (já está no formato correto)**/
  convertISOToDisplay(dateString: string): string {
    if (!dateString) return '';
    
    // Se já está no formato DD/MM/YYYY, retorna como está
    if (dateString.includes('/') && dateString.length === 10) {
      return dateString;
    }
    
    // Se está no formato ISO, converte
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    return `${day}/${month}/${year}`;
  }

  /**Converte data DD/MM/YYYY para formato DD/MM/YYYY (mantém formato)**/
  convertDisplayToISO(displayDate: string): string {
    if (!displayDate) return '';
    
    // Se tem 8 dígitos (DDMMYYYY), converte para DD/MM/YYYY
    if (displayDate.length === 8) {
      const day = displayDate.substring(0, 2);
      const month = displayDate.substring(2, 4);
      const year = displayDate.substring(4, 8);
      return `${day}/${month}/${year}`;
    }
    
    // Se já está no formato DD/MM/YYYY, retorna como está
    if (displayDate.length === 10 && displayDate.includes('/')) {
      return displayDate;
    }
    
    return '';
  }

  atualizar(): void {
    console.log('=== DEBUG ATUALIZAR FUNCIONÁRIO ===');
    console.log('Form válido:', this.formFuncionario.form.valid);
    console.log('Data nascimento display:', this.dataNascimentoDisplay);
    console.log('Data admissão display:', this.dataAdmissaoDisplay);
    console.log('Funcionário antes da conversão:', this.funcionario);
    
    this.erroGeral = '';
    this.erroDataNascimento = '';
    this.erroDataAdmissao = '';
    this.showErrorDataNascimento = false;
    this.showErrorDataAdmissao = false;
    
    // Converte as datas do formato de exibição para ISO
    this.funcionario.dataNascimento = this.convertDisplayToISO(this.dataNascimentoDisplay);
    this.funcionario.dataAdmissao = this.convertDisplayToISO(this.dataAdmissaoDisplay);
    
    console.log('Data nascimento convertida:', this.funcionario.dataNascimento);
    console.log('Data admissão convertida:', this.funcionario.dataAdmissao);
    
    // Validações manuais para os campos de data
    if (!this.dataNascimentoDisplay || (this.dataNascimentoDisplay.length !== 8 && this.dataNascimentoDisplay.length !== 10)) {
      this.erroDataNascimento = 'A data de nascimento é obrigatória e deve estar no formato DD/MM/AAAA.';
      this.showErrorDataNascimento = true;
      console.log('Erro data nascimento:', this.erroDataNascimento);
    }
    
    if (!this.dataAdmissaoDisplay || (this.dataAdmissaoDisplay.length !== 8 && this.dataAdmissaoDisplay.length !== 10)) {
      this.erroDataAdmissao = 'A data de admissão é obrigatória e deve estar no formato DD/MM/AAAA.';
      this.showErrorDataAdmissao = true;
      console.log('Erro data admissão:', this.erroDataAdmissao);
    }
    
    // Verifica se há erros de validação
    if (this.showErrorDataNascimento || this.showErrorDataAdmissao) {
      console.log('Retornando por erro de validação');
      return;
    }
    
    console.log('Funcionário final:', this.funcionario);
    
    // Validação simplificada para teste
    if (this.funcionario.nome && this.funcionario.email && this.funcionario.dataNascimento && this.funcionario.dataAdmissao && this.funcionario.senha && this.funcionario.cargo) {
      console.log('Chamando serviço para atualizar...');
      const resultado = this.funcionarioService.atualizar(this.funcionario);
      console.log('Resultado do serviço:', resultado);
      
      if (resultado.sucesso) {
        console.log('Sucesso! Fechando modal...');
        this.close.emit();
      } else {
        this.erroGeral = resultado.erro || 'Erro ao atualizar funcionário';
        console.log('Erro:', this.erroGeral);
      }
    } else {
      this.erroGeral = 'Por favor, preencha todos os campos obrigatórios corretamente.';
      console.log('Formulário inválido:', this.erroGeral);
      console.log('Campos obrigatórios:', {
        nome: this.funcionario.nome,
        email: this.funcionario.email,
        dataNascimento: this.funcionario.dataNascimento,
        dataAdmissao: this.funcionario.dataAdmissao,
        senha: this.funcionario.senha,
        cargo: this.funcionario.cargo
      });
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
