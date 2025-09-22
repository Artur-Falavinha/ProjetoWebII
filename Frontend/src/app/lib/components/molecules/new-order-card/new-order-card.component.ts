import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  public categories = [
    {
      value: 1,
      label: 'a',
    },
    { value: 2, label: 'b' },
  ];

  constructor(private fb: FormBuilder, private router: Router) {}

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
  }
}
