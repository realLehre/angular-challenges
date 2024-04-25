import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'person',
  standalone: true,
})
export class PersonPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
