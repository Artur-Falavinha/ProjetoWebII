import { Routes } from '@angular/router';
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
import { authGuard } from '@/app/lib/guards/auth/auth.guard';

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
    canActivate: [authGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  // {
  //   path: 'solicitacao',
  //   component: SolicitacaoManutencaoComponent,
  // },
  {
    path: 'admin',
    component: FuncionarioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/solicitacoes',
    component: ListarSolicitacoesComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/orcamento/:id',
    component: EfetuarOrcamentoComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/categorias',
    component: ListarCategoriaComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/funcionarios',
    component: ListarFuncionarioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/funcionarios/new',
    component: InserirFuncionarioComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/relatorios',
    component: FuncionarioComponent,
    canActivate: [authGuard]
  },
  
  {
    // TODO: Pág. 404
    path: '**',
    redirectTo: 'login',
  },
];
