import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { AuthService } from '../../../lib/services/auth/auth.service';
import { ButtonComponent } from '../../../lib/components/atoms/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIconModule, MatCardModule,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private  snackBar: MatSnackBar
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

    this.authService.login(this.loginForm.value).subscribe({
    next: (authState) => {
      if (authState.isAuthenticated) {
        this.snackBar.open(
          `Bem-vindo(a), ${authState.user?.name}!`, 
          'Fechar', 
          { duration: 3000 }
        );
        
        const userRole = authState.user?.role;
        if (userRole === 'FUNCIONARIO') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/client']);
        }
      }
    },
    error: (err) => {
      this.snackBar.open(
        'Falha no login. Verifique suas credenciais.', 
        'Fechar',
        { duration: 4000 }
      );
      console.error(err);
    }
  });
  }
}