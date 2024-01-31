import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryTodoRepository } from '../repositories/in-memory/in-memory-todo-repository';
import { GetAllTodosUseCase } from './get-all-todos-use-case';
import { TodoRepository } from '../repositories/todo-repository';
import { Todo } from '../domain/todo';

describe('GetAllTodosUseCase (Unit)', () => {
  let sut: GetAllTodosUseCase;
  let todoRepository: TodoRepository;
  let todos: Todo[];

  beforeEach(() => {
    todos = [
      {
        id: 1,
        title: 'Todo 1',
        description: 'Todo 1 description',
        done: false
      },
      {
        id: 2,
        title: 'Todo 2',
        description: 'Todo 2 description',
        done: false
      },
      {
        id: 3,
        title: 'Todo 3',
        description: 'Todo 3 description',
        done: false
      }
    ];
    todoRepository = new InMemoryTodoRepository(todos);
    sut = new GetAllTodosUseCase(todoRepository);
  });

  it('should be able to return all todos', () => {
    expect(sut.execute()).resolves.toEqual(todos);
  });
});
