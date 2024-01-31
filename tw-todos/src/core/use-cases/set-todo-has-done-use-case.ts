import { TodoNotFoundError } from '../errors/todo-not-found-error';
import { TodoRepository } from '../repositories/todo-repository';

export class SetTodoHasDoneUseCase {
  constructor(private readonly _todoRepository: TodoRepository) {}

  async execute(id: number): Promise<void> {
    const todo = await this._todoRepository.getById(id);

    if (!todo) {
      throw new TodoNotFoundError();
    }

    todo.done = true;
    await this._todoRepository.update(todo, id);
  }
}
