import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import {
  ButtonComponent,
  TagComponent,
  TextAreaInputComponent,
} from '@/app/lib/components';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { OrderRequest, SituationEnum } from '@/app/@types';
import { MatIcon } from '@angular/material/icon';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    TextAreaInputComponent
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
      fix_description: ['', [Validators.required, Validators.maxLength(300)]],
      orientation: ['', [Validators.maxLength(300)]],
    });
  }

  public get fixDescriptionControl() {
    return this.efetuarManutencaoForm.get('fix_description') as FormControl;
  }

  public get orientationControl() {
    return this.efetuarManutencaoForm.get('orientation') as FormControl;
  }

  onSubmit(): void {
    if (this.efetuarManutencaoForm.invalid) {
      this.efetuarManutencaoForm.markAllAsTouched();
      return;
    }

    this.order!.situation = SituationEnum.ARRUMADA;
    this.order!.fix_description = this.fixDescriptionControl!.value;
    this.order!.orientation = this.orientationControl!.value;


    this.solicitacaoService.atualizar(this.order!);

    this.snackBar.open('Solicitação aprovada com sucesso!', 'Fechar', {
      duration: 5000,
      panelClass: ['snackbar-success'],
    });

    this.router.navigate(['/admin/solicitacoes']);
  }
}
