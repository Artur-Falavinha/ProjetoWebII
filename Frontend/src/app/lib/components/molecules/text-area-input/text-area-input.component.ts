import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-text-area-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
  ],
  templateUrl: './text-area-input.component.html',
  styleUrls: ['./text-area-input.component.scss'],
})
export class TextAreaInputComponent {
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() rows: number = 3;
  @Input() errorMessages: { [key: string]: string } = {};
  @Input() hint: string | null = null;

  get errorMessage(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched)
      return null;

    for (const errorKey of Object.keys(this.control.errors)) {
      if (this.errorMessages[errorKey]) {
        return this.errorMessages[errorKey];
      }
    }
    return 'Campo inválido';
  }
}
