import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";
import { ButtonVariant } from '@/app/@types';

@Component({
  selector: 'app-button',
  standalone: true,                     
  imports: [CommonModule, RouterModule, MatIconModule, MatButton], 
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() link?: string;
  @Input() icon?: string;
  @Input() disabled?: boolean;
  @Input() submit?: boolean;
  @Input() variant: ButtonVariant = 'primary';

}