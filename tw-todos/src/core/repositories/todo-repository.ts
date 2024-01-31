import { Todo } from '../domain/todo';

export interface TodoRepository {
  getAll(): Promise<Todo[]>;
  getById(id: number): Promise<Todo | null>;
  create(todo: Todo): Promise<Todo>;
  delete(id: number): Promise<void>;
  update(todo: Todo, id: number): Promise<Todo | null>
}
