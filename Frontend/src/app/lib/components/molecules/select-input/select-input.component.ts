import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent {
  @Input() control!: FormControl;
  @Input() label: string = '';
  @Input() placeholder: string = '--';
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() options: {value: number; label: string;}[] = [];
  @Input() optionLabel: string = 'label';
  @Input() optionValue: string = 'value';
  @Input() errorMessages: { [key: string]: string } = {};
  @Input() hint: string | null = null; // pode ser texto fixo

  get errorMessage(): string | null {
    if (!this.control || !this.control.errors || !this.control.touched) return null;

    for (const errorKey of Object.keys(this.control.errors)) {
      if (this.errorMessages[errorKey]) {
        return this.errorMessages[errorKey];
      }
    }
    return 'Campo inválido';
  }
}
