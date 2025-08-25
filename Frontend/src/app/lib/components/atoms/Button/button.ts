import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,                     
  imports: [CommonModule, RouterModule, MatIconModule], 
  templateUrl: './button.html',
  styleUrls: ['./button.scss']
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() link?: string;
  @Input() icon?: string;
  @Input() disabled?: boolean;
  @Input() submit?: boolean;

  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    if (!this.link) {
      this.clicked.emit();
    }
  }
}