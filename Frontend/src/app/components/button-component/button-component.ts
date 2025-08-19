import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button-component',
  standalone: true,                     
  imports: [CommonModule, RouterModule], 
  templateUrl: './button-component.html',
  styleUrls: ['./button-component.css']  
})
export class ButtonComponent {
  @Input() title: string = 'Botão';
  @Input() link: string = '/';
}


//terminar ainda