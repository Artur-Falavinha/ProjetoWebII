import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'CLIENT' | 'ADMIN' | 'EMPLOYEE';
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authState = signal<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  readonly isAuthenticated = this.authState.asReadonly();

  login(credentials: { email: string; password: string }): Observable<AuthState> {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    const usuarioEncontrado = usuarios.find(
      (user: any) => user.email === credentials.email && user.senha === credentials.password
    );

    if (usuarioEncontrado) {
      const userProfile: UserProfile = {
        id: usuarioEncontrado.id || '1',
        name: usuarioEncontrado.nome,
        email: usuarioEncontrado.email,
        role: usuarioEncontrado.role
      };

      const newState: AuthState = {
        isAuthenticated: true,
        user: userProfile,
        token: 'mock-jwt-token-from-localstorage'
      };

      this.authState.set(newState);
      return of(newState);
    }

    return new Observable(observer => observer.error({ message: 'Credenciais inválidas' }));
  }

  logout(): void {
    this.authState.set({
      isAuthenticated: false,
      user: null,
      token: null
    });
    localStorage.removeItem('auth-token'); 
  }

  register(userData: any): Observable<{ user: any; password: string }> {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

    if (usuarios.some((user: any) => user.email === userData.email)) {
      return new Observable(observer => observer.error({ message: 'Este email já está cadastrado!' }));
    }

    const senhaAleatoria = Math.floor(1000 + Math.random() * 9000).toString();
    const novoUsuario = { ...userData, senha: senhaAleatoria };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    return of({ user: novoUsuario, password: senhaAleatoria });
  }

  getCurrentUser(): UserProfile | null {
    return this.authState().user;
  }

  getToken(): string | null {
    return this.authState().token;
  }

  checkAuthStatus(): boolean {
    return this.authState().isAuthenticated;
  }
}