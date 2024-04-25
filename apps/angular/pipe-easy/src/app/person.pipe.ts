import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personPipe',
  standalone: true,
})
export class PersonPipe implements PipeTransform {
  transform(value: string, index: number): string {
    return `${value} - ${index}`;
  }
}
