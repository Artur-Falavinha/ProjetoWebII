import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService, UserProfile } from '../../../services/auth/auth.service';

interface NavigationItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink, 
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly navigationItems = computed(() => {
    const user = this.userProfile();
    
    if (user.role === 'EMPLOYEE') {
      return [
        {
          path: '/admin',
          label: 'Página Inicial',
          icon: 'home'
        },
        {
          path: '/admin/solicitacoes',
          label: 'Solicitações',
          icon: 'list'
        },
        {
          path: '/admin/categorias',
          label: 'Categorias',
          icon: 'local_offer'
        },
        {
          path: '/admin/funcionarios',
          label: 'Funcionários',
          icon: 'group'
        },
        {
          path: '/admin/relatorios',
          label: 'Relatórios',
          icon: 'bar_chart'
        }
      ];
    }
    
    // Default para CLIENT
    return [
      {
        path: '/',
        label: 'Página Inicial',
        icon: 'home'
      },
      {
        path: '/nova-solicitacao',
        label: 'Nova Solicitação',
        icon: 'add'
      }
    ];
  });

  readonly userProfile = computed(() => {
    const currentUser = this.authService.getCurrentUser();
    
    // Se usuário logado, usar o perfil real
    if (currentUser) {
      return currentUser;
    }
    
    // Se não logado, detectar pela rota atual
    const currentUrl = this.router.url;
    const isAdminRoute = currentUrl.startsWith('/admin');
    
    return {
      id: '',
      name: isAdminRoute ? 'Funcionário' : 'Usuário não logado',
      email: isAdminRoute ? 'funcionario@email.com' : '',
      role: isAdminRoute ? 'EMPLOYEE' as const : 'CLIENT' as const
    };
  });

  readonly isAuthenticated = computed(() => 
    this.authService.checkAuthStatus()
  );

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private loadUserProfile(): void {
    //Removi o redirecionamento para visualizar a estilização da sidebar depois vou adicionar novamente
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  getUserTypeLabel(): string {
    const user = this.userProfile();
    return user.role === 'EMPLOYEE' ? 'Funcionário' : 'Cliente';
  }
}