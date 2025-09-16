import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from "@angular/material/button";

@Component({
  selector: 'app-tag',
  standalone: true,                     
  imports: [CommonModule, RouterModule, MatIconModule, MatButton], 
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss']
})
export class TagComponent {
  @Input() title: string = '';
  @Input() color: 
}