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
            ModalComponent,
            NgxMaskDirective
          ],
  providers: [provideNgxMask()],
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.scss'
})
export class FuncionarioFormComponent implements OnInit {
  
  @Output() close = new EventEmitter<void>();
  @Input() funcionarioId?: number; /**ID do funcionário para edição (opcional)**/
  @Input() isEditMode: boolean = false; /**Define se é modo de edição ou inserção**/
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

  // Propriedades para exibição das datas no formato DD/MM/YYYY
  dataNascimentoDisplay: string = '';
  dataAdmissaoDisplay: string = '';
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
        dataAdmissao: funcionarioEncontrado.dataAdmissao,
        dataNascimento: funcionarioEncontrado.dataNascimento
      };
      
      // Converte as datas para exibição
      this.dataNascimentoDisplay = this.convertISOToDisplay(funcionarioEncontrado.dataNascimento);
      this.dataAdmissaoDisplay = this.convertISOToDisplay(funcionarioEncontrado.dataAdmissao);
    }
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

  /**Salva o funcionário (inserir ou atualizar)**/
  onFormSubmit(): void {
    this.limparErros();
    
    // Validações manuais para os campos de data
    if (!this.dataNascimentoDisplay || (this.dataNascimentoDisplay.length !== 8 && this.dataNascimentoDisplay.length !== 10)) {
      this.exibirErro('A data de nascimento é obrigatória e deve estar no formato DD/MM/AAAA.');
      return;
    }
    
    if (!this.dataAdmissaoDisplay || (this.dataAdmissaoDisplay.length !== 8 && this.dataAdmissaoDisplay.length !== 10)) {
      this.exibirErro('A data de admissão é obrigatória e deve estar no formato DD/MM/AAAA.');
      return;
    }
    
    if (this.formFuncionario.form.valid) {
      // Converte as datas do formato de exibição para ISO
      this.funcionario.dataNascimento = this.convertDisplayToISO(this.dataNascimentoDisplay);
      this.funcionario.dataAdmissao = this.convertDisplayToISO(this.dataAdmissaoDisplay);
      
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
    } else {
      this.exibirErro('Por favor, preencha todos os campos obrigatórios corretamente.');
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
