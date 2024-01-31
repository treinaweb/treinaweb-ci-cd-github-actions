import { CreateTodoUseCase } from '@/core/use-cases/create-todo-use-case';
import { DeleteTodoByIdUseCase } from '@/core/use-cases/delete-todo-by-id-use-case';
import { GetAllTodosUseCase } from '@/core/use-cases/get-all-todos-use-case';
import { GetTodoByIdUseCase } from '@/core/use-cases/get-todo-by-id-use-case';
import { RepositoryFactory } from './repository-factory';
import { SetTodoHasDoneUseCase } from '@/core/use-cases/set-todo-has-done-use-case';

export class UseCaseFactory {

  private static _getAllTodosUseCaseInstance: GetAllTodosUseCase;
  private static _getTodoByIdUseCaseInstance: GetTodoByIdUseCase;
  private static _createTodoUseCaseInstance: CreateTodoUseCase;
  private static _deleteTodoByIdUseCaseInstance: DeleteTodoByIdUseCase;
  private static _setTodoHasDoneUseCase: SetTodoHasDoneUseCase;

  static get getAllTodosUseCase(): GetAllTodosUseCase {
    if (!this._getAllTodosUseCaseInstance) {
      this._getAllTodosUseCaseInstance = new GetAllTodosUseCase(
        RepositoryFactory.todoRepository
      );
    }
    return this._getAllTodosUseCaseInstance;
  }

  static get getTodoByIdUseCase(): GetTodoByIdUseCase {
    if (!this._getTodoByIdUseCaseInstance) {
      this._getTodoByIdUseCaseInstance = new GetTodoByIdUseCase(
        RepositoryFactory.todoRepository
      );
    }
    return this._getTodoByIdUseCaseInstance;
  }

  static get createTodoUseCase(): CreateTodoUseCase {
    if (!this._createTodoUseCaseInstance) {
      this._createTodoUseCaseInstance = new CreateTodoUseCase(
        RepositoryFactory.todoRepository
      );
    }
    return this._createTodoUseCaseInstance;
  }

  static get deleteTodoByIdUseCase(): DeleteTodoByIdUseCase {
    if (!this._deleteTodoByIdUseCaseInstance) {
      this._deleteTodoByIdUseCaseInstance = new DeleteTodoByIdUseCase(
        RepositoryFactory.todoRepository
      );
    }
    return this._deleteTodoByIdUseCaseInstance;
  }

  static get setTodoHasDoneUseCase(): SetTodoHasDoneUseCase {
    if (!this._setTodoHasDoneUseCase) {
      this._setTodoHasDoneUseCase = new SetTodoHasDoneUseCase(
        RepositoryFactory.todoRepository
      );
    }
    return this._setTodoHasDoneUseCase;
  }

}
