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

  constructor(
    private funcionarioService: FuncionarioService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.funcionarios = this.listarTodas();
  }

  listarTodas(): FuncionarioRequest[] {
    return this.funcionarioService.listarTodas();
  }

  abrirModalInserir(): void {
    const dialogRef = this.dialog.open(InserirFuncionarioComponent, {
      width: '600px'
    });

    dialogRef.componentInstance.close.subscribe(() => dialogRef.close());

    dialogRef.afterClosed().subscribe(() => {
      this.funcionarios = this.listarTodas();
    });
  }

  abrirModalEditar(funcionario: FuncionarioRequest): void {
    const dialogRef = this.dialog.open(EditarFuncionarioComponent, {
      width: '600px',
      data: funcionario
    });

    dialogRef.componentInstance.close.subscribe(() => dialogRef.close());

    dialogRef.afterClosed().subscribe(() => {
      this.funcionarios = this.listarTodas();
    });
  }

  remover($event: any, funcionario: FuncionarioRequest): void {
    if (confirm(`Deseja remover o funcionário ${funcionario.nome}?`)) {
      const usuarioLogado = this.authService.getCurrentUser();
      const usuarioLogadoId = usuarioLogado ? parseInt(usuarioLogado.id) : undefined;
      
      const resultado = this.funcionarioService.remover(funcionario.id, usuarioLogadoId);
      
      if (resultado.sucesso) {
        this.funcionarios = this.listarTodas();
      } else {
        alert(resultado.erro);
      }
    }
  }
}
