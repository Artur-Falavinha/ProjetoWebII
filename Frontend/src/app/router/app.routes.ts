import { Routes } from '@angular/router';
import {
  LoginComponent,
  RegisterComponent,
  ClientHomeComponent,
  SolicitacaoManutencaoComponent,
  FuncionarioComponent,
} from '@/app/pages';

// Configurar AuthGuard
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'client',
    component: ClientHomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'solicitacao',
    component: SolicitacaoManutencaoComponent,
  },
  {
    path: 'admin',
    component: FuncionarioComponent,
  },
  {
    // TODO: Pág. 404
    path: '**',
    redirectTo: 'login',
  },
];
