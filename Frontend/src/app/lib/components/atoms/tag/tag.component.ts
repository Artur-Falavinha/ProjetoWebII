import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { SituationEnum } from '@/app/@types/enums/SituationEnum';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButton],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class TagComponent {
  public SituationEnum = SituationEnum;

  @Input() variant: SituationEnum = SituationEnum.ABERTA;

  public getVariantLabel(): string {
    switch (this.variant) {
      case SituationEnum.ABERTA:
        return 'Aberta';
      case SituationEnum.ORCADA:
        return 'Orçada';
      case SituationEnum.REJEITADA:
        return 'Rejeitada';
      case SituationEnum.APROVADA:
        return 'Aprovada';
      case SituationEnum.REDIRECIONADA:
        return 'Redirecionada';
      case SituationEnum.ARRUMADA:
        return 'Arrumada';
      case SituationEnum.PAGA:
        return 'Paga';
      case SituationEnum.FINALIZADA:
        return 'Finalizada';
      default:
        return '';
    }
  }
}
