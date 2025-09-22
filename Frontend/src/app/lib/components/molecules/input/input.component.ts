import { Component, Input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() control!: FormControl;
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: string = 'text';
  @Input() icon: string | null = null;
  @Input() appearance: 'fill' | 'outline' = 'outline';
  @Input() errorMessages: { [key: string]: string } = {};
  @Input() mask: string | null = null;
  @Input() hint: string | null = null;

  showPassword = false;

  get inputType(): string {
    if (this.type === 'password') {
      return this.showPassword ? 'text' : 'password';
    }
    return this.type;
  }

  get passwordIcon(): string {
    if (this.type === 'password') {
      return this.showPassword ? 'visibility_off' : 'visibility';
    }
    return this.icon || '';
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

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
