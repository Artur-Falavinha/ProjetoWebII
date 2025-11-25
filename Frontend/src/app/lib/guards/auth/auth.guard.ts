import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar se está autenticado
  if (!authService.checkAuthStatus()) {
    return router.createUrlTree(['/login']);
  }

  const currentUser = authService.getCurrentUser();
  
  // Se é funcionário (EMPLOYEE) tentando acessar /client, redireciona para /admin
  if (currentUser?.role === 'EMPLOYEE' && state.url === '/client') {
    return router.createUrlTree(['/admin']);
  }

  // Se é client (CLIENT) tentando acessar rotas admin, redireciona para /client
  if (currentUser?.role === 'CLIENT' && state.url.startsWith('/admin')) {
    return router.createUrlTree(['/client']);
  }

  // Permitir acesso para outros casos
  return true;
};