import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { randText } from '@ngneat/falso';
import { TodoModel } from '../../todo.model';

@Injectable({ providedIn: 'root' })
export class TodoService {
  todos = signal<TodoModel[]>([]);
  constructor(private http: HttpClient) {}

  getTodos() {
    return this.http.get<TodoModel[]>(
      'https://jsonplaceholder.typicode.com/todos',
    );
  }

  updateTodo(todo: TodoModel) {
    return this.http.put<TodoModel>(
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
    );
  }

  deleteTodo(todo: TodoModel) {
    return this.http.delete(
      `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
    );
  }
}
