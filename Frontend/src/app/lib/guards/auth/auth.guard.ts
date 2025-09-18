import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@/app/lib/services';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Permitir acesso à rota /cliente para visualizar a sidebar
  if (state.url === '/client') {
    return true;
  }

  if (authService.checkAuthStatus()) {
    return true;
  } else {
    // Redireciona para login se não autenticado
    return router.createUrlTree(['/login']);
  }
};