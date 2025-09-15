import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '@/app/lib/components/organisms/sidebar/sidebar.component';
import { MatIconModule } from '@angular/material/icon';
import { FuncionarioService } from '@/app/lib/services/funcionario/funcionario.service';
import { Funcionario } from '@/app/shared/models/funcionario.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InserirFuncionarioComponent } from '../inserir-funcionario/inserir-funcionario.component';

@Component({
  selector: 'app-listar-funcionario',
  standalone: true,
  imports: [MatIconModule, SidebarComponent, CommonModule, RouterModule],
  templateUrl: './listar-funcionario.component.html',
  styleUrl: './listar-funcionario.component.scss'
})
export class ListarFuncionarioComponent implements OnInit {
  funcionarios: Funcionario[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.funcionarios = this.listarTodas();
  }

  listarTodas(): Funcionario[] {
    return this.funcionarioService.listarTodas();
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(InserirFuncionarioComponent, {
      width: '600px'
    });

    dialogRef.componentInstance.close.subscribe(() => dialogRef.close());

    dialogRef.afterClosed().subscribe(() => {
      this.funcionarios = this.listarTodas();
    });
  }

  editarFuncionario(funcionario: Funcionario): void {
    // TODO: Implementar edição de funcionário
    console.log('Editar funcionário:', funcionario);
  }

  excluirFuncionario(id: number): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarioService.remover(id);
      this.funcionarios = this.listarTodas();
    }
  }

  formatarData(data: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(data));
  }

  getStatusClass(ativo: boolean): string {
    return ativo ? 'status-ativo' : 'status-inativo';
  }

  getStatusText(ativo: boolean): string {
    return ativo ? 'Ativo' : 'Inativo';
  }
}
