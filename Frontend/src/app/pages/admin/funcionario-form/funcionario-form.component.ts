import { Component, ViewChild, EventEmitter, Output, Input, OnInit } from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from '@/app/lib/components/molecules/modal/modal.component';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [CommonModule, 
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
            ModalComponent
          ],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss'
})
export class FuncionarioFormComponent implements OnInit {
  
  @Output() close = new EventEmitter<void>();
  @Input() funcionarioId?: number; /**ID do funcionário para edição (opcional)**/
  @Input() isEditMode: boolean = false; /**Define se é modo de edição ou inserção**/
  @ViewChild('formFuncionario') formFuncionario!: NgForm;

  funcionario: Funcionario = new Funcionario();
  erroEmail: string = '';
  erroGeral: string = '';
  
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
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.isEditMode && this.funcionarioId) {
      this.carregarFuncionario();
    }
  }

  /**Carrega os dados do funcionário para edição**/
  carregarFuncionario(): void {
    if (!this.funcionarioId) return;
    
    const funcionarioEncontrado = this.funcionarioService.buscaPorId(this.funcionarioId);
    if (funcionarioEncontrado) {
      /**Cria uma cópia do funcionário para evitar mutação direta**/
      this.funcionario = { 
        ...funcionarioEncontrado,
        dataAdmissao: new Date(funcionarioEncontrado.dataAdmissao),
        dataNascimento: new Date(funcionarioEncontrado.dataNascimento)
      };
    }
  }

  /**Salva o funcionário (inserir ou atualizar)**/
  onFormSubmit(): void {
    this.limparErros();
    
    if (this.formFuncionario.form.valid) {
      let resultado;
      
      if (this.isEditMode) {
        resultado = this.funcionarioService.atualizar(this.funcionario);
      } else {
        resultado = this.funcionarioService.inserir(this.funcionario);
      }
      
      if (resultado.sucesso) {
        this.close.emit(); /**Fecha o modal**/
      } else {
        this.exibirErro(resultado.erro || 'Erro ao salvar funcionário');
      }
    }
  }

  /**Limpa os erros do formulário**/
  limparErros(): void {
    this.erroEmail = '';
    this.erroGeral = '';
  }

  /**Exibe erro no formulário**/
  exibirErro(mensagem: string): void {
    if (mensagem.includes('email')) {
      this.erroEmail = mensagem;
    } else {
      this.erroGeral = mensagem;
    }
  }

  /**Fecha o modal sem salvar**/
  onFormClose(): void {
    this.close.emit(); 
  }

  /**Retorna o título do modal baseado no modo**/
  get modalTitle(): string {
    return this.isEditMode ? 'Editar Funcionário' : 'Adicionar Novo Funcionário';
  }

  /**Retorna a descrição do modal baseada no modo**/
  get modalDescription(): string {
    return this.isEditMode ? 'Atualize as informações do funcionário' : 'Cadastre um novo funcionário no sistema';
  }

  /**Retorna o texto do botão baseado no modo**/
  get submitButtonText(): string {
    return this.isEditMode ? 'Salvar Alterações' : 'Adicionar';
  }

  /**Retorna se o formulário é válido**/
  get isFormValid(): boolean {
    return this.formFuncionario?.form?.valid || false;
  }
}
