import { Routes } from '@angular/router';
import { LoginComponent } from '@/app/pages';
import { ClienteComponent } from '../pages/cliente.component';
import { RegisterComponent } from '../pages/auth/register/register';
import { SolicitacaoManutencaoComponent } from '../pages/manutencao/solicitacao';

// Configurar AuthGuard
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'cliente',
    component: ClienteComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'solicitacao',
    component: SolicitacaoManutencaoComponent
  },
  {
    // TODO: Pág. 404
    path: '**',
    redirectTo: 'login'
  }
];
