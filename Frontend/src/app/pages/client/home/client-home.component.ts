import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent, ButtonComponent } from '@/app/lib/components';

@Component({
  selector: 'app-client',
  imports: [SidebarComponent, ButtonComponent],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientHomeComponent {}