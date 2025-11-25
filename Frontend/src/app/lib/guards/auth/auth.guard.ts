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

  // Se é funcionário (FUNCIONARIO) tentando acessar /client, redireciona para /admin
  if (currentUser?.role === 'FUNCIONARIO' && state.url === '/client') {
    return router.createUrlTree(['/admin']);
  }

  // Se é client (CLIENTE) tentando acessar rotas admin, redireciona para /client
  if (currentUser?.role === 'CLIENTE' && state.url.startsWith('/admin')) {
    return router.createUrlTree(['/client']);
  }

  if (!currentUser?.role) {
    return router.createUrlTree(['/login'])
  }

  // Permitir acesso para outros casos
  return true;
};
