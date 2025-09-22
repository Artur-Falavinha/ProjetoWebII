import { Routes } from '@angular/router';
import { authGuard } from '../lib/guards/auth/auth.guard';
import { employeeGuard } from '../lib/guards/auth/employee.guard';
import {
  LoginComponent,
  RegisterComponent,
  ClientHomeComponent,
  //SolicitacaoManutencaoComponent,
  FuncionarioComponent,
  ListarCategoriaComponent,
  InserirCategoriaComponent,
  ListarFuncionarioComponent,
  InserirFuncionarioComponent,
  ListarSolicitacoesComponent,
  EfetuarOrcamentoComponent
} from '@/app/pages';

// Configurar AuthGuard
export const routes: Routes = [
  // Rotas Públicas
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',  
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
    path: 'client',
    component: ClientHomeComponent,
    canActivate: [authGuard] 
  },
  
  {
    path: 'admin',
    component: FuncionarioComponent,
    canActivate: [authGuard, employeeGuard]
  },
  {
    path: 'admin/solicitacoes',
    component: ListarSolicitacoesComponent,
    canActivate: [authGuard, employeeGuard]
  },
  {
    path: 'admin/orcamento/:id',
    component: EfetuarOrcamentoComponent,
    canActivate: [authGuard, employeeGuard] 
  },
  {
    path: 'admin/categorias',
    component: ListarCategoriaComponent,
    canActivate: [authGuard, employeeGuard]
  },
  {
    path: 'admin/funcionarios',
    component: ListarFuncionarioComponent,
    canActivate: [authGuard, employeeGuard] 
  },
  {
    path: 'admin/funcionarios/new',
    component: InserirFuncionarioComponent,
    canActivate: [authGuard, employeeGuard]
  },
  {
    path: 'admin/relatorios',
    component: FuncionarioComponent,
    canActivate: [authGuard, employeeGuard] 
  },
  
  {
    path: '**',
    redirectTo: 'login',
  },
];