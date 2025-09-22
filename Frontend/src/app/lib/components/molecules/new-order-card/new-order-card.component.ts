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
import { SelectInputComponent } from '../select-input/select-input.component';
import { TextAreaInputComponent } from '../text-area-input/text-area-input.component';
import { AuthService, CategoriaService } from '@/app/lib/services';
import { SolicitacaoService } from '@/app/lib/services/solicitacao/solicitacao.service';
import { SituationEnum } from '@/app/@types';

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
  ],
  templateUrl: './new-order-card.component.html',
  styleUrls: ['./new-order-card.component.scss'],
})

export class NewOrderCardComponent implements OnInit {
  newOrderForm!: FormGroup;

  public categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private solicitacaoService: SolicitacaoService,
    private categoriaService: CategoriaService
  ) {
    this.categories = this.categoriaService.listarTodas();
  }

  ngOnInit(): void {
    this.newOrderForm = this.fb.group({
      product: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', [Validators.required]],
      issue_description: ['', [Validators.required]],
    });
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

    const user = this.authService.getCurrentUser();

    this.solicitacaoService.inserir({
      client: user!.name,
      clientEmail: user!.email,
      category: this.categoryControl.value,
      product: this.productControl.value,
      issue_description: this.issue_descriptionControl.value,
      situation: SituationEnum.ABERTA,
    });

    this.router.navigate(['/client']);
  }
}
