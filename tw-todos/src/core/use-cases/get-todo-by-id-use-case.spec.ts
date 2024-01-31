import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryTodoRepository } from '../repositories/in-memory/in-memory-todo-repository';
import { TodoRepository } from '../repositories/todo-repository';
import { Todo } from '../domain/todo';
import { GetTodoByIdUseCase } from './get-todo-by-id-use-case';
import { TodoNotFoundError } from '../errors/todo-not-found-error';

describe('GetTodoByIdUseCase (Unit)', () => {
  let sut: GetTodoByIdUseCase;
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
    sut = new GetTodoByIdUseCase(todoRepository);
  });

  it('should return a todo when a valid id is provided', async () => {
    const todo = await sut.execute(1);
    expect(todo).toEqual(todos[0]);
  });

  it('should throw an error when an invalid id is provided', async () => {
    const expectedError = new TodoNotFoundError();
    await expect(sut.execute(4)).rejects.toThrow(expectedError);
  });
});
