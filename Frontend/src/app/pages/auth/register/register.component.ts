import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../lib/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ButtonComponent } from '../../../lib/components/atoms/button/button.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
    MatStepperModule, MatProgressSpinnerModule, NgxMaskDirective
  ],
  providers: [provideNgxMask()],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  get nomeControl() { return this.registerForm.get('dadosPessoais.nome') as FormControl; }
  get emailControl() { return this.registerForm.get('dadosPessoais.email') as FormControl; }
  get cpfControl() { return this.registerForm.get('dadosPessoais.cpf') as FormControl; }
  get telefoneControl() { return this.registerForm.get('dadosPessoais.telefone') as FormControl; }
  get cepControl() { return this.registerForm.get('endereco.cep') as FormControl; }
  get logradouroControl() { return this.registerForm.get('endereco.logradouro') as FormControl; }
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      dadosPessoais: this.fb.group({
        nome: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
        telefone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      }),
      endereco: this.fb.group({
        cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: [''],
        bairro: ['', [Validators.required]],
        cidade: ['', [Validators.required]],
        uf: ['', [Validators.required]],
      }),
    });
  }

  consultarCep(): void {
    const cep = this.cepControl.value;
    if (cep && cep.replace(/\D/g, '').length === 8) {
      this.isLoading = true;
      const cepFormatado = cep.replace(/\D/g, '');

      this.http.get<any>(`https://viacep.com.br/ws/${cepFormatado}/json/`)
        .subscribe(dados => {
          if (!dados.erro) {
            this.registerForm.get('endereco')?.patchValue({
              logradouro: dados.logradouro,
              bairro: dados.bairro,
              cidade: dados.localidade,
              uf: dados.uf,
              complemento: dados.complemento
            });
          }
          this.isLoading = false;
        });
    }
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formValue = this.registerForm.getRawValue();

    const dadosNovoUsuario = {
      ...formValue.dadosPessoais,
      endereco: formValue.endereco,
    };

    this.authService.register(dadosNovoUsuario).subscribe({
      next: () => {
        this.isLoading = false;
        const emailParaAviso = this.emailControl.value || 'seu e-mail';

        this.snackBar.open(
          `Cadastro realizado com sucesso! Verifique seu e-mail (${emailParaAviso}).`,
          'Fechar',
          { duration: 5000 }
        );

        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;

        const errorMessage =
          err.error?.message || err.statusText || 'Não foi possível concluir o cadastro.';

        this.snackBar.open(
          `Erro no cadastro: ${errorMessage}`,
          'Fechar',
          { duration: 4000 }
        );

        console.error(err);
      }
    });
  }
}
