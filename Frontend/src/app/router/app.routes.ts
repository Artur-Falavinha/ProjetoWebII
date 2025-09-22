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
import { ViewComponent } from '../pages/client/view/view.component';
import { PaymentComponent } from '../pages/client/payment/payment.component';

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
    path: 'client/payment/:id',
    component: PaymentComponent,
  },
  {
    path: 'client/view/:id',
    component: ViewComponent,
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
