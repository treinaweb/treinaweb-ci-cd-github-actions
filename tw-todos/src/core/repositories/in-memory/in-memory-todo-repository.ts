import { Todo } from '@/core/domain/todo';
import { TodoRepository } from '../todo-repository';

export class InMemoryTodoRepository implements TodoRepository {

  private _todos: Todo[];

  constructor(todos: Todo[] = []) {
    if (todos.length === 0) {
      this._todos = [
        {
          id: 1,
          title: 'Todo 1',
          description: 'Todo 1 description',
          done: false
        }
      ];
    } else {
      this._todos = todos;
    }
  }

  update(todo: Todo, id: number): Promise<Todo | null> {
    const index = this._todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    todo.id = id;
    this._todos[index] = todo;
    return Promise.resolve(todo);
  }

  getAll(): Promise<Todo[]> {
    return Promise.resolve(this._todos);
  }

  getById(id: number): Promise<Todo | null> {
    const todo = this._todos.find((todo) => todo.id === id);
    return Promise.resolve(todo || null);
  }

  create(todo: Todo): Promise<Todo> {
    const id = this._todos.length + 1;
    const newTodo = { ...todo, id };
    this._todos.push(newTodo);
    return Promise.resolve(newTodo);
  }

  delete(id: number): Promise<void> {
    this._todos = this._todos.filter((todo) => todo.id !== id);
    return Promise.resolve();
  }

}
