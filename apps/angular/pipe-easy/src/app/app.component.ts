import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PersonPipe } from './person.pipe';

@Component({
  standalone: true,
  imports: [NgFor, PersonPipe],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; let index = index">
      {{ person | personPipe: index }}
    </div>
  `,
})
export class AppComponent {
  persons = ['toto', 'jack'];
}
