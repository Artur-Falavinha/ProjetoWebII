import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service'; 

export const employeeGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getCurrentUser();

  if (user && user.role == 'FUNCIONARIO') {
    return true;
  }

  alert('Acesso restrito a funcionários.');
  return router.createUrlTree(['/client']); 
};