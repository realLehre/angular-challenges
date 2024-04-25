import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PersonPipe } from './personPipe.pipe';

@Component({
  standalone: true,
  imports: [NgFor, PersonPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index; let isFirst = first">
      {{ person | personPipe: index }}
    </div>
  `,
})
export class AppComponent {
  persons = [
    { name: 'Toto', age: 10 },
    { name: 'Jack', age: 15 },
    { name: 'John', age: 30 },
  ];
}
