import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ButtonComponent, TagComponent } from '@/app/lib/components';
import { InputComponent } from '../input/input.component';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatFormFieldControl,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { OrderRequest, SituationEnum, ButtonVariant } from '@/app/@types';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-view-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    TagComponent,
    MatIcon,
    ButtonComponent
  ],
  templateUrl: './view-card.component.html',
  styleUrls: ['./view-card.component.scss'],
})
export class ViewCardComponent {
  @Input() order?: OrderRequest;

  public get actionButton() {
    if (!this.order) return null;

    switch (this.order.situation) {
      case SituationEnum.ARRUMADA:
        return {
          title: 'Pagar Serviço',
          link: `/client/payment/${this.order.id}`,
          icon: 'payment',
          variant: 'primary' as ButtonVariant
        };
      default:
        return null;
    }
  }
}