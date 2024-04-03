import { of } from 'rxjs';
import { TodoModel } from '../../todo.model';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let todoService: TodoService;
  let httpClientMock: any;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    };

    todoService = new TodoService(httpClientMock);
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  it('should get all todos', () => {
    const res: TodoModel[] = [
      { id: 0, title: 'test', body: 'test body', userId: 111, completed: true },
    ];
    const url = 'https://jsonplaceholder.typicode.com/todos';
    jest.spyOn(httpClientMock, 'get').mockReturnValue(of(res));
    todoService.getTodos();
    expect(httpClientMock.get).toBeCalledTimes(1);
    expect(httpClientMock.get).toHaveBeenCalledWith(url);
  });

  it('should update todo', () => {
    const todo: TodoModel = {
      id: 0,
      title: 'test',
      body: 'test body',
      userId: 111,
      completed: true,
    };
    const url = 'https://jsonplaceholder.typicode.com/todos/' + todo.id;
    jest.spyOn(httpClientMock, 'put').mockReturnValue(of(todo));
    todoService.updateTodo(todo);
    expect(httpClientMock.put).toBeCalledTimes(1);
  });
});
