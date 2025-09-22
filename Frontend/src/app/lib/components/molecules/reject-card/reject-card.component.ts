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
import { TextAreaInputComponent } from '../text-area-input/text-area-input.component';
import { OrderRequest } from '@/app/@types';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-reject-card',
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
    TextAreaInputComponent,
  ],
  templateUrl: './reject-card.component.html',
  styleUrls: ['./reject-card.component.scss'],
})
export class RejectCardComponent implements OnInit {
  rejectForm!: FormGroup;

  @Input() order?: OrderRequest;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.rejectForm = this.fb.group({
      reject_reason: ['', [Validators.required, Validators.maxLength(300)]],
    });
  }

  public get reject_reasonControl() {
    return this.rejectForm.get('reject_reason') as FormControl;
  }

  onSubmit(): void {
    if (this.rejectForm.invalid) {
      this.rejectForm.markAllAsTouched();
      return;
    }
  }
}
