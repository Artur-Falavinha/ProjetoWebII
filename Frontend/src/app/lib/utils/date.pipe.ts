import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateOnly',
  standalone: true,
})
export class FormatDateOnlyPipe implements PipeTransform {
  transform(dateStr: string): string {
    const date = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, '0');

    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
  }
}
