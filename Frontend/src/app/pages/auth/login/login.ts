import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// Imports do Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const usuarioEncontrado = usuarios.find(
      (user: any) => user.email === email && user.senha === password
    );

    if (usuarioEncontrado) {
      alert(`Bem-vindo(a), ${usuarioEncontrado.nome}!`);
      sessionStorage.setItem('usuario_logado', JSON.stringify(usuarioEncontrado));

      if (usuarioEncontrado.perfil === 'FUNCIONARIO') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/cliente']);
      }

    } else {
      alert('Email ou senha inválidos. Verifique os dados e tente novamente.');
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}