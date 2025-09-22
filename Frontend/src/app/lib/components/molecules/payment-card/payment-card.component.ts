import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent } from '@/app/lib/components';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { OrderRequest } from '@/app/@types';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-payment-card',
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
    MatIcon,
  ],
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss'],
})
export class PaymentCardComponent {
  @Input() order?: OrderRequest;

  constructor(private fb: FormBuilder, private router: Router) {}

}
