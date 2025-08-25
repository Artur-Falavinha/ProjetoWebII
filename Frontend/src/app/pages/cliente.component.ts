import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SidebarComponent } from '../lib/components/organisms/sidebar';

@Component({
  selector: 'app-cliente',
  imports: [SidebarComponent],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteComponent {}