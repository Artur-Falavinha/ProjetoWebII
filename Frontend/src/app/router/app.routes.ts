import { Routes } from '@angular/router';
import { LoginComponent } from '@/app/pages';

// Configurar AuthGuard
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    // TODO: Pág. 404
    path: '**',
    redirectTo: 'login'
  }
];
