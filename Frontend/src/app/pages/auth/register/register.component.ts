import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';

import { InputComponent } from '@/app/lib/components/molecules/input/input.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    InputComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  tipoCadastro: 'CLIENTE' | 'FUNCIONARIO' = 'CLIENTE';

  constructor(private fb: FormBuilder, private router: Router) {}

  get nomeControl() {
    return this.registerForm?.get('dadosPessoais.nome') as FormControl;
  }
  get emailControl() {
    return this.registerForm?.get('dadosPessoais.email') as FormControl;
  }
  get cpfControl() {
    return this.registerForm?.get('dadosPessoais.cpf') as FormControl;
  }
  get telefoneControl() {
    return this.registerForm?.get('dadosPessoais.telefone') as FormControl;
  }
  get cepControl() {
    return this.registerForm?.get('endereco.cep') as FormControl;
  }
  get logradouroControl() {
    return this.registerForm?.get('endereco.logradouro') as FormControl;
  }


  ngOnInit(): void {
    this.registerForm = this.fb.group({
      dadosPessoais: this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        telefone: [
          '',
          [Validators.required, Validators.pattern(/^\d{10,11}$/)],
        ],
      }),
      endereco: this.fb.group({
        cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        estado: ['', [Validators.required]],
      }),
    });
  }

  setTipoCadastro(tipo: 'CLIENTE' | 'FUNCIONARIO'): void {
    this.tipoCadastro = tipo;
    const enderecoGroup = this.registerForm.get('endereco');

    if (tipo === 'FUNCIONARIO') {
      enderecoGroup?.disable();
    } else {
      enderecoGroup?.enable();
    }
  }

  onSubmit(): void {
    if (
      (this.tipoCadastro === 'CLIENTE' && this.registerForm.invalid) ||
      (this.tipoCadastro === 'FUNCIONARIO' &&
        this.registerForm.get('dadosPessoais')?.invalid)
    ) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formValue = this.registerForm.getRawValue();

    const novoUsuario = {
      ...formValue.dadosPessoais,
      ...(this.tipoCadastro === 'CLIENTE'
        ? { endereco: formValue.endereco }
        : {}),
      perfil: this.tipoCadastro,
    };

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    if (usuarios.some((user: any) => user.email === novoUsuario.email)) {
      alert('Este email já está cadastrado!');
      this.isLoading = false;
      return;
    }

    const senhaAleatoria = Math.floor(1000 + Math.random() * 9000).toString();
    (novoUsuario as any).senha = senhaAleatoria;

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert(
      `Cadastro de ${this.tipoCadastro.toLowerCase()} realizado com sucesso!\n\n` +
        `SENHA DE ACESSO: ${senhaAleatoria}`
    );

    this.isLoading = false;
    this.router.navigate(['/login']);
  }
}
