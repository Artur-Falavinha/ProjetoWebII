import { Component, ViewChild, EventEmitter, Output, Input, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Funcionario } from '@/app/shared/models/funcionario.model';
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
  ],
  templateUrl: './editar-funcionario.component.html',
  styleUrl: './editar-funcionario.component.scss'
})

export class EditarFuncionarioComponent {

  @Output() close = new EventEmitter<void>();
  @ViewChild('formFuncionario') formFuncionario!: NgForm;
  funcionario: Funcionario;
  erroGeral: string = '';
  erroDataNascimento: string = '';
  erroDataAdmissao: string = '';
  showErrorDataNascimento: boolean = false;
  showErrorDataAdmissao: boolean = false;
  
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
    @Inject(MAT_DIALOG_DATA) public data: Funcionario 
  ) {
    this.funcionario = { ...data };
    // Converte as datas para objetos Date se necessário
    this.funcionario.dataNascimento = new Date(this.funcionario.dataNascimento);
    this.funcionario.dataAdmissao = new Date(this.funcionario.dataAdmissao);
  }

  atualizar(): void {
    this.erroGeral = '';
    this.erroDataNascimento = '';
    this.erroDataAdmissao = '';
    this.showErrorDataNascimento = false;
    this.showErrorDataAdmissao = false;
    
    // Validações manuais para os campos de data
    if (!this.funcionario.dataNascimento) {
      this.erroDataNascimento = 'A data de nascimento é obrigatória.';
      this.showErrorDataNascimento = true;
    }
    
    if (!this.funcionario.dataAdmissao) {
      this.erroDataAdmissao = 'A data de admissão é obrigatória.';
      this.showErrorDataAdmissao = true;
    }
    
    if (this.formFuncionario.form.valid && this.funcionario.dataNascimento && this.funcionario.dataAdmissao) {
      const resultado = this.funcionarioService.atualizar(this.funcionario);
      
      if (resultado.sucesso) {
        this.close.emit();
      } else {
        this.erroGeral = resultado.erro || 'Erro ao atualizar funcionário';
      }
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
