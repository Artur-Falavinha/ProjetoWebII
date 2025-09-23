import { Routes } from '@angular/router';
import {
  LoginComponent,
  RegisterComponent,
  ClientHomeComponent,
  FuncionarioComponent,
  ListarCategoriaComponent,
  InserirCategoriaComponent,
  ListarFuncionarioComponent,
  InserirFuncionarioComponent,
  ListarSolicitacoesComponent,
  EfetuarOrcamentoComponent,
  NewOrderComponent,
} from '@/app/pages';
import { RelatoriosComponent } from '@/app/pages/admin/relatorios/relatorios.component';
import { QuoteComponent } from '../pages/client/quote/quote.component';
import { RejectComponent } from '../pages/client/reject/reject.component';
import { ApproveComponent } from '../pages/client/approve/approve.component';
import { ViewComponent } from '../pages/client/view/view.component';
import { PaymentComponent } from '../pages/client/payment/payment.component';
import { authGuard } from '@/app/lib/guards/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'client',
    component: ClientHomeComponent,
    canActivate: [authGuard],
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
    canActivate: [authGuard],
  },
  {
    path: 'client/new-order',
    component: NewOrderComponent,
    canActivate: [authGuard],
  },
  {
    path: 'client/quote/:id',
    component: QuoteComponent,
    canActivate: [authGuard],
  },
  {
    path: 'client/reject/:id',
    component: RejectComponent,
    canActivate: [authGuard],
  },
  {
    path: 'client/approve/:id',
    component: ApproveComponent,
    canActivate: [authGuard],
  },
  {
    path: 'client/payment/:id',
    component: PaymentComponent,
    canActivate: [authGuard],
  },
  {
    path: 'client/view/:id',
    component: ViewComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: FuncionarioComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/solicitacoes',
    component: ListarSolicitacoesComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/orcamento/:id',
    component: EfetuarOrcamentoComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/categorias',
    component: ListarCategoriaComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/funcionarios',
    component: ListarFuncionarioComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/funcionarios/new',
    component: InserirFuncionarioComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/relatorios',
    component: RelatoriosComponent,
    canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
