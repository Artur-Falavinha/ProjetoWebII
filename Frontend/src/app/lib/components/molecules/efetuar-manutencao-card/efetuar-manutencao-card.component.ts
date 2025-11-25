import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  ButtonComponent,
  TagComponent,
  TextAreaInputComponent,
} from '@/app/lib/components';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { MatIcon } from '@angular/material/icon';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '@/app/lib/services';
import {
  getFormattedDate,
  getFormattedDateOnly,
  getFormattedTimeOnly,
} from '@/app/lib/utils/getDateFormatted';

@Component({
  selector: 'app-efetuar-manutencao-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    ButtonComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    TagComponent,
    MatIcon,
    TextAreaInputComponent,
  ],
  templateUrl: './efetuar-manutencao-card.component.html',
  styleUrls: ['./efetuar-manutencao-card.component.scss'],
})
export class EfetuarManutencaoCardComponent implements OnInit {
  @Input() order?: OrderRequest;

  efetuarManutencaoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.efetuarManutencaoForm = this.fb.group({
      descricaoManutencao: ['', [Validators.required, Validators.maxLength(300)]],
      orientacoesManutencao: ['', [Validators.maxLength(300)]],
    });
  }

  public get fixDescriptionControl() {
    return this.efetuarManutencaoForm.get('descricaoManutencao') as FormControl;
  }

  public get orientacoesManutencaoControl() {
    return this.efetuarManutencaoForm.get('orientacoesManutencao') as FormControl;
  }

  onSubmit(): void {
    if (this.efetuarManutencaoForm.invalid) {
      this.efetuarManutencaoForm.markAllAsTouched();
      return;
    }

    this.solicitacaoService
      .arrumar({
        id: this.order!.id,
        descricaoManutencao: this.fixDescriptionControl.value,
        orientacaoCliente: this.orientacoesManutencaoControl.value,
      })
      .subscribe({
        next: (result) => {
          if (result) {
            this.snackBar.open('Manutenção efetuada com sucesso', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-success'],
            });
            this.router.navigate(['/admin/solicitacoes']);
          } else {
            this.snackBar.open('Erro ao efetuar Manutenção', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-error'],
            });
          }
        },
        error: (err) => {
          this.snackBar.open(err ? err : 'Erro ao efetuar Manutenção', 'OK', {
            duration: 5000,
            panelClass: ['snackbar-error'],
          });
        },
      });
  }
}
