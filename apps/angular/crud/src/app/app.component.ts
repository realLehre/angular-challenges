import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { TodoModel } from './todo.model';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos()">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos = this.todoService.todos;

  constructor(
    private http: HttpClient,
    private todoService: TodoService,
  ) {}

  ngOnInit(): void {
    this.todoService.getTodos();
    console.log(this.todos);
  }

  update(todo: TodoModel) {
    this.todoService.updateTodo(todo);
  }

  delete(todo: TodoModel) {
    this.todoService.deleteTodo(todo);
  }
}
