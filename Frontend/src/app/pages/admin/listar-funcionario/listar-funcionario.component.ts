import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { FuncionarioService } from '@/app/lib/services/funcionario/funcionario.service';
import { AuthService } from '@/app/lib/services/auth/auth.service';
import { FuncionarioRequest } from '@/app/@types';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InserirFuncionarioComponent } from '../inserir-funcionario/inserir-funcionario.component';
import { EditarFuncionarioComponent } from '../editar-funcionario/editar-funcionario.component';

@Component({
  selector: 'app-listar-funcionario',
  standalone: true,
  imports: [MatIconModule, SidebarComponent, CommonModule, RouterModule],
  templateUrl: './listar-funcionario.component.html',
  styleUrl: './listar-funcionario.component.scss'
})
export class ListarFuncionarioComponent implements OnInit {
  
  funcionarios: FuncionarioRequest[] = [];
  mensagem: string = "";
  mensagem_detalhes: string = "";

  constructor(
    private funcionarioService: FuncionarioService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listarTodas();
  }

  listarTodas(): void {
    this.funcionarioService.listarTodas().subscribe({
      next: (data: FuncionarioRequest[]) => {
        this.funcionarios = data ?? [];
      },
      error: (err) => {
        this.mensagem = "Erro ao buscar lista de funcionários";
        this.mensagem_detalhes = `[${err.status}] ${err.message}`;
      }
    });
  }

  formatarTelefone(telefone: string): string {
    if (!telefone) return '';

    const numeros = telefone.replace(/\D/g, '');

    if (numeros.length === 11) {
      return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 7)}-${numeros.substring(7)}`;
    }

    if (numeros.length === 10) {
      return `(${numeros.substring(0, 2)}) ${numeros.substring(2, 6)}-${numeros.substring(6)}`;
    }

    return telefone;
  }

  abrirModalInserir(): void {
    const dialogRef = this.dialog.open(InserirFuncionarioComponent, { width: '600px' });

    dialogRef.componentInstance.close.subscribe(() => dialogRef.close());
    dialogRef.afterClosed().subscribe(() => this.listarTodas());
  }

  abrirModalEditar(funcionario: FuncionarioRequest): void {
    const dialogRef = this.dialog.open(EditarFuncionarioComponent, {
      width: '600px',
      data: funcionario
    });

    dialogRef.componentInstance.close.subscribe(() => dialogRef.close());
    dialogRef.afterClosed().subscribe(() => this.listarTodas());
  }

  remover($event: any, funcionario: FuncionarioRequest): void {
    $event.preventDefault();
    this.mensagem = "";
    this.mensagem_detalhes = "";

    if (confirm(`Deseja remover o funcionário ${funcionario.nome}?`)) {
      
      this.funcionarioService.remover(funcionario.id).subscribe({
        complete: () => this.listarTodas(),
        error: (err) => {
          this.mensagem = `Erro removendo usuário ${funcionario.id} – ${funcionario.nome}`;
          this.mensagem_detalhes = `[${err.status}] ${err.message}`;
        }
      });
    }
  }
}
