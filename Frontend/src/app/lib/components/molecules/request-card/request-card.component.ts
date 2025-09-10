import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { ButtonComponent } from '@/app/lib/components'

@Component({
  selector: 'app-request-card',
  standalone: true,                     
  imports: [CommonModule, RouterModule, MatCardModule, ButtonComponent], 
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.scss']
})
export class RequestCardComponent {

}