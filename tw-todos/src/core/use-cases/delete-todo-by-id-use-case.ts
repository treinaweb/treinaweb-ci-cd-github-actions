import { TodoNotFoundError } from '../errors/todo-not-found-error';
import { TodoRepository } from '../repositories/todo-repository';

export class DeleteTodoByIdUseCase {
  constructor(private readonly _todoRepository: TodoRepository) {}

  async execute(id: number) {
    const todo = await this._todoRepository.getById(id);

    if (!todo) {
      throw new TodoNotFoundError();
    }

    await this._todoRepository.delete(id);
  }
}
