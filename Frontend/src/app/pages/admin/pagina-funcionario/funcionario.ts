import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';
import { AuthService } from '@/app/lib/services/auth/auth.service';

interface Solicitacao {
  id: number;
  dataHora: string;
  clienteNome: string;
  equipamento: string;
  defeito: string;
  status: string; 
}

@Component({
  selector: 'app-funcionario', 
  standalone: true,           
  imports: [
    CommonModule,              
    SidebarComponent         
  ],
  templateUrl: './funcionario.html',
  styleUrls: ['./funcionario.scss']
})
export class FuncionarioComponent implements OnInit {
  private readonly authService = inject(AuthService);
  solicitacoesAbertas: Solicitacao[] = [];

  constructor() {
    // Simular login de funcionário para visualização
    this.authService.login({ email: 'funcionario@email.com', password: 'senha' }).subscribe();
  }

  ngOnInit(): void {
    this.carregarSolicitacoesAbertas();
  }

  carregarSolicitacoesAbertas(): void {
    const todasSolicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]');

    this.solicitacoesAbertas = todasSolicitacoes.filter(
      (solicitacao: Solicitacao) => solicitacao.status === 'ABERTA'
    );
    
    console.log('Solicitações em aberto carregadas:', this.solicitacoesAbertas);
  }
}