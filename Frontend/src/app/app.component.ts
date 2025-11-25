import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './lib/services/auth/auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'test-project';

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.auth.getCurrentUser();
    if (this.auth.checkAuthStatus() && user?.role) {
      if (user.role === 'FUNCIONARIO') {
        this.router.navigate(['/admin']);
      } else if (user.role === 'CLIENTE') {
        this.router.navigate(['/client']);
      }
    }
  }
}
