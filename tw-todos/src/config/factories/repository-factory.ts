import { InMemoryTodoRepository } from '@/core/repositories/in-memory/in-memory-todo-repository';
import { PrismaTodoRepository } from '@/core/repositories/prisma/prisma-todo-repository';
import { TodoRepository } from '@/core/repositories/todo-repository';
import { env } from '../env';

export class RepositoryFactory {
  private static _todoRepositoryInstance: TodoRepository;

  static get todoRepository(): TodoRepository {
    if (!this._todoRepositoryInstance) {
      switch (env.NODE_ENV) {
        case 'test':
          this._todoRepositoryInstance = new InMemoryTodoRepository();
          break;
        default:
          this._todoRepositoryInstance = new PrismaTodoRepository();
          break;
      }
    }
    return this._todoRepositoryInstance;
  }
}
