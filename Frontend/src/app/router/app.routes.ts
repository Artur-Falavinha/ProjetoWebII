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
  InserirFuncionarioComponent
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
/*  {
    path: 'solicitacao',
    component: SolicitacaoManutencaoComponent,
  },*/
  {
    path: 'admin',
    component: FuncionarioComponent,
  },
  {
    path: 'admin/solicitacoes',
    component: FuncionarioComponent,
  },
  {
    path: 'admin/categorias',
    component: ListarCategoriaComponent,
  },
  {
    path: 'admin/categorias/new',
    component: InserirCategoriaComponent,
  },
  {
    path: 'admin/funcionarios',
    component: ListarFuncionarioComponent,
  },
  {
    path: 'admin/funcionarios/new',
    component: InserirFuncionarioComponent,
  },
  {
    path: 'admin/relatorios',
    component: FuncionarioComponent,
  },
  
  {
    // TODO: Pág. 404
    path: '**',
    redirectTo: 'login',
  },
];
