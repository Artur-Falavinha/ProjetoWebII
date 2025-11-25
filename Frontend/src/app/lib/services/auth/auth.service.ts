import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, map, catchError, switchMap } from 'rxjs/operators';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'CLIENTE'| 'FUNCIONARIO';
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
  private readonly BASE_URL = 'http://localhost:8080/auth';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null
  });

  public authState$ = this.authStateSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkTokenRecovery();
  }

  // --- LOGIN INTEGRADO ---
  // 1. Pega o Token
  // 2. Busca os dados do usuário (/me)
  // 3. Retorna o objeto AuthState completo (corrige seu erro de compilação)
  login(credentials: { email: string; password: string }): Observable<AuthState> {
    return this.http.post<any>(`${this.BASE_URL}/login`, credentials, this.httpOptions)
      .pipe(
        switchMap(response => {
          if (response && response.token) {
            // Prepara o cabeçalho com o Token para bater no endpoint /me
            const authHeader = new HttpHeaders({
              'Authorization': `Bearer ${response.token}`
            });
            return this.http.get<any>(`${this.BASE_URL}/me`, { headers: authHeader })
              .pipe(
                map(userData => {
                  return { 
                    token: response.token, 
                    user: userData 
                  };
                })
              );
          } else {
            return throwError(() => new Error('Token não fornecido pelo servidor.'));
          }
        }),
        map(combinedData => {
          const userBackend = combinedData.user;
          const userProfile: UserProfile = {
            id: userBackend.id,
            name: userBackend.nome,
            email: userBackend.email,
            role: userBackend.role
          };
          const newState: AuthState = {
            isAuthenticated: true,
            user: userProfile,
            token: combinedData.token
          };
          // Salva token e perfil juntos
          this.saveTokenAndProfile(combinedData.token, userProfile);
          this.authStateSubject.next(newState);
          return newState;
        }),
        catchError(error => {
          console.error('Erro no login:', error);
          throw error; 
        })
      );
  }

  // --- REGISTER ---
  register(userData: any): Observable<any> {
    // Mantém apenas cadastro normal (client)
    return this.http.post(`${this.BASE_URL}/register`, userData, this.httpOptions);
  }

  // --- LOGOUT ---
  logout(): void {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user')
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null,
      token: null
    });
  }

  private saveTokenAndProfile(token: string, user: UserProfile): void {
    localStorage.setItem('auth-token', token);
    localStorage.setItem('auth-user', JSON.stringify(user));
  }

  private checkTokenRecovery(): void {
    const token = localStorage.getItem('auth-token');
    const userRaw = localStorage.getItem('auth-user');
    let user: UserProfile | null = null;
    if (userRaw) {
      try {
        user = JSON.parse(userRaw);
      } catch {
        user = null;
      }
    }
    if (token && user) {
      // Restaura estado imediatamente
      this.authStateSubject.next({
        isAuthenticated: true,
        user,
        token
      });
      // Valida token em background
      const authHeader = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      this.http.get<any>(`${this.BASE_URL}/me`, { headers: authHeader }).subscribe({
        next: (userBackend) => {
          // Atualiza perfil se mudou
          const userProfile: UserProfile = {
            id: userBackend.id,
            name: userBackend.nome,
            email: userBackend.email,
            role: userBackend.role
          };
          this.authStateSubject.next({
            isAuthenticated: true,
            user: userProfile,
            token
          });
          this.saveTokenAndProfile(token, userProfile);
        },
        error: () => {
          this.logout();
        }
      });
    }
  }

  getCurrentUser(): UserProfile | null {
    return this.authStateSubject.value.user;
  }

  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  checkAuthStatus(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }
}
