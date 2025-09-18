import { Component, ViewChild, EventEmitter, Output } from '@angular/core';
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

@Component({
  selector: 'app-inserir-funcionario',
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
            MatCheckboxModule
          ],
  templateUrl: './inserir-funcionario.component.html',
  styleUrl: './inserir-funcionario.component.scss'
})

export class InserirFuncionarioComponent {
  
@Output() close = new EventEmitter<void>();
@ViewChild('formFuncionario') formFuncionario!: NgForm;

  funcionario : Funcionario = new Funcionario();
  
  // Opções para o select de cargo
  cargos = [
    'Técnico de Manutenção',
    'Supervisor',
    'Gerente',
    'Administrador',
    'Auxiliar'
  ];

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router) { }

  inserir(): void {
  if (this.formFuncionario.form.valid) {
    this.funcionarioService.inserir(this.funcionario);
    this.close.emit(); // fecha o modal
  }
}
  closeModal(): void {
    this.close.emit(); 
  }

}
