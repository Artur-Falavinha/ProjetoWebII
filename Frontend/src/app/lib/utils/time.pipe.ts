import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTimeOnly',
  standalone: true,
})
export class FormatTimeOnlyPipe implements PipeTransform {
  transform(dateStr: string): string {
    const date = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  }
}
