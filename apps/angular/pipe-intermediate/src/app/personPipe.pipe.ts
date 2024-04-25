import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personPipe',
  standalone: true,
})
export class PersonPipe implements PipeTransform {
  transform(value: { name: string; age: number }, index: number): unknown {
    const isAllowed =
      index === 0 ? 'always allowed' : value.age > 25 ? 'allowed' : 'declined';
    return `${value.name} - ${index} ${isAllowed}`;
  }
}
