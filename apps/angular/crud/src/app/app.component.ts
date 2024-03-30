import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoadingSpinnerService } from './services/loading-spinner.service';
import { TodoService } from './services/todo.service';
import { TodoModel } from './todo.model';

@Component({
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  selector: 'app-root',
  template: `
    @if (isLoading()) {
      <div id="spinner">
        <app-loading-spinner></app-loading-spinner>
      </div>
    } @else {
      <div *ngFor="let todo of todos()">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos = this.todoService.todos;
  isLoading = this.loadingSpinnerService.isLoading;

  constructor(
    private todoService: TodoService,
    private loadingSpinnerService: LoadingSpinnerService,
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos();
  }

  update(todo: TodoModel) {
    this.todoService.updateTodo(todo);
  }

  delete(todo: TodoModel) {
    this.todoService.deleteTodo(todo);
  }
}
