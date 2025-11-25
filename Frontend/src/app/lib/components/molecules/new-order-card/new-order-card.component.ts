import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@/app/lib/components';
import { InputComponent } from '../input/input.component';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SelectInputComponent } from '../select-input/select-input.component';
import { TextAreaInputComponent } from '../text-area-input/text-area-input.component';
import { AuthService, CategoriaService } from '@/app/lib/services';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { SituationEnum } from '@/app/@types';
import { getFormattedDate } from '@/app/lib/utils/getDateFormatted';
import { map, Observable } from 'rxjs';
import { CategoriaResponse } from '@/app/@types/api/CategoriaResponse';

@Component({
  selector: 'app-new-order-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    SelectInputComponent,
    TextAreaInputComponent,
    MatSnackBarModule,
  ],
  templateUrl: './new-order-card.component.html',
  styleUrls: ['./new-order-card.component.scss'],
})
export class NewOrderCardComponent implements OnInit {
  newOrderForm!: FormGroup;
  public categories$!: Observable<CategoriaResponse[] | any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private solicitacaoService: SolicitacaoService,
    private categoriaService: CategoriaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.newOrderForm = this.fb.group({
      product: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', [Validators.required]],
      issue_description: ['', [Validators.required]],
    });

    this.categories$ = this.categoriaService.listarTodas();
  }

  public get productControl() {
    return this.newOrderForm.get('product') as FormControl;
  }

  public get categoryControl() {
    return this.newOrderForm.get('category') as FormControl;
  }

  public get issue_descriptionControl() {
    return this.newOrderForm.get('issue_description') as FormControl;
  }

  onSubmit(): void {
    if (this.newOrderForm.invalid) {
      this.newOrderForm.markAllAsTouched();
      return;
    }

    this.solicitacaoService
      .inserir({
        categoriaId: this.categoryControl.value,
        descricaoEquipamento: this.productControl.value,
        descricaoDefeito: this.issue_descriptionControl.value,
      })
      .subscribe({
        next: (result) => {
          if (result) {
            this.snackBar.open('Solicitação enviada com sucesso', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-success'],
            });
            this.router.navigate(['/client']);
          } else {
            this.snackBar.open('Erro ao enviar solicitação', 'OK', {
              duration: 5000,
              panelClass: ['snackbar-error'],
            });
          }
        },
        error: (err) => {
          this.snackBar.open(err ? err : 'Erro ao enviar solicitação', 'OK', {
            duration: 5000,
            panelClass: ['snackbar-error'],
          });
        },
      });
  }
}
