import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';

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

  solicitacoesAbertas: Solicitacao[] = [];

  constructor() {}

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