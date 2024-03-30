import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { TodoModel } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos = signal<TodoModel[]>([]);
  constructor(private http: HttpClient) {}

  getTodos() {
    this.http
      .get<TodoModel[]>('https://jsonplaceholder.typicode.com/todos')
      .subscribe((todos) => {
        this.todos.set(todos);
        console.log(todos);
      });
  }

  updateTodo(todo: TodoModel) {
    this.http
      .put<TodoModel>(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        JSON.stringify({
          todo: todo.id,
          title: randText(),
          body: todo.body,
          userId: todo.userId,
        }),
        {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        },
      )
      .subscribe((todoUpdated: TodoModel) => {
        const index = this.todos().findIndex(
          (prevTodo) => prevTodo.id == todo.id,
        );
        this.todos()[index] = todoUpdated;
      });
  }
}
