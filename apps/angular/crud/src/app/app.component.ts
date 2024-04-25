import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { LoadingSpinnerService } from './services/loading-spinner.service';
import { TodoService } from './services/todo/todo.service';
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
      <div *ngFor="let todo of todos">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
        <button (click)="delete(todo)">Delete</button>
      </div>
    }
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos: TodoModel[] = [];
  isLoading = this.loadingSpinnerService.isLoading;

  constructor(
    private todoService: TodoService,
    private loadingSpinnerService: LoadingSpinnerService,
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos();
    this.getTodos();
  }

  getTodos() {
    this.loadingSpinnerService.showSpinner();
    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.loadingSpinnerService.hideSpinner();
        this.todos = todos;
      },
      error: () => {
        this.loadingSpinnerService.hideSpinner();
      },
    });
  }
  update(todo: TodoModel) {
    this.loadingSpinnerService.showSpinner();
    this.todoService.updateTodo(todo).subscribe({
      next: (t) => {
        this.loadingSpinnerService.hideSpinner();

        this.todos = this.todos.map((prevTodo) => {
          return prevTodo.id == t.id ? { ...prevTodo, ...t } : { ...prevTodo };
        });
      },
      error: () => {
        this.loadingSpinnerService.hideSpinner();
      },
    });
  }

  delete(todo: TodoModel) {
    this.loadingSpinnerService.showSpinner();
    this.todoService.deleteTodo(todo).subscribe({
      next: () => {
        this.loadingSpinnerService.hideSpinner();
        this.todos = this.todos.filter((t) => t.id != todo.id);
      },
      error: () => {
        this.loadingSpinnerService.hideSpinner();
      },
    });
  }
}
