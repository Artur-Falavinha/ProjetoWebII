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

  readonly navigationItems: NavigationItem[] = [
    {
      path: '/',
      label: 'Página Inicial',
      icon: 'fa-solid fa-house'
    },
    {
      path: '/nova-solicitacao',
      label: 'Nova Solicitação',
      icon: 'fa-solid fa-plus'
    }
  ];

  readonly userProfile = computed(() => {
    const currentUser = this.authService.getCurrentUser();
    return currentUser || {
      id: '',
      name: 'Usuário não logado',
      email: '',
      role: 'CLIENT' as const
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

  getMatIcon(faIcon: string): string {
    const iconMap: Record<string, string> = {
      'fa-solid fa-house': 'home',
      'fa-solid fa-plus': 'add'
    };
    return iconMap[faIcon] || 'help';
  }
}