import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '@/app/lib/components';

@Component({
  selector: 'app-client',
  imports: [SidebarComponent],
  templateUrl: './client-home.component.html',
  styleUrl: './client-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientHomeComponent {}