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
  NewOrderComponent,
} from '@/app/pages';
import { QuoteComponent } from '../pages/client/quote/quote.component';
import { RejectComponent } from '../pages/client/reject/reject.component';
import { ApproveComponent } from '../pages/client/approve/approve.component';

// Configurar AuthGuard
export const routes: Routes = [
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
  },
  {
    path: 'client/new-order',
    component: NewOrderComponent,
  },
  {
    path: 'client/quote/:id',
    component: QuoteComponent,
  },
  {
    path: 'client/reject/:id',
    component: RejectComponent,
  },
  {
    path: 'client/approve/:id',
    component: ApproveComponent,
  },
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
