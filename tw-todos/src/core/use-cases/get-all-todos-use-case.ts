import { Todo } from '../domain/todo';
import { TodoRepository } from '../repositories/todo-repository';

export class GetAllTodosUseCase {
  constructor(private readonly _todoRepository: TodoRepository) {}

  async execute(): Promise<Todo[]> {
    return this._todoRepository.getAll();
  }
}
