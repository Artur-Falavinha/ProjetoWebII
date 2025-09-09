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
    // TODO: Implementar chamada para API de login
    // Simular funcionário se email contém 'funcionario' ou 'admin'
    const isEmployee = credentials.email.includes('funcionario') || credentials.email.includes('admin');
    
    const mockUser: UserProfile = {
      id: isEmployee ? '2' : '1',
      name: isEmployee ? 'Maria Santos' : 'Nome User login',
      email: isEmployee ? 'funcionario@email.com' : credentials.email,
      role: isEmployee ? 'EMPLOYEE' : 'CLIENT'
    };

    const newState: AuthState = {
      isAuthenticated: true,
      user: mockUser,
      token: 'mock-jwt-token'
    };

    this.authState.set(newState);
    return of(newState);
  }

  logout(): void {
    this.authState.set({
      isAuthenticated: false,
      user: null,
      token: null
    });
    localStorage.removeItem('auth-token');
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