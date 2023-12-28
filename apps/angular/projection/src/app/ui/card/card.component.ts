import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { StudentStore } from '../../data-access/student.store';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-container [ngTemplateOutlet]="cardImage"></ng-container>

      <section>
        @for (item of list; track $index) {
          <app-list-item
            [name]="item[cardProp]"
            [id]="item.id"
            [type]="type"
            (deleteItem)="onDeleteItem($event)"></app-list-item>
        }
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent, NgTemplateOutlet],
})
export class CardComponent {
  @Input() list: any[] = [];
  @Input() type!: CardType;
  @Input() customClass = '';
  @Input() cardImage!: TemplateRef<any>;
  @Input() cardProp!: string;
  @Output() addItem = new EventEmitter<CardType>();
  @Output() deleteItem = new EventEmitter<number>();

  CardType = CardType;

  constructor(
    private teacherStore: TeacherStore,
    private studentStore: StudentStore,
  ) {}

  addNewItem() {
    this.addItem.emit();
  }

  onDeleteItem(data: number) {
    this.deleteItem.emit(data);
  }
}
