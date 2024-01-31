import { Todo } from '../domain/todo';
import { TodoRepository } from '../repositories/todo-repository';

export class CreateTodoUseCase {
  constructor(private readonly _todoRepository: TodoRepository) {}

  async execute(todo: Todo) {
    todo.done = false;

    return await this._todoRepository.create(todo);
  }
}
