import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryTodoRepository } from '../repositories/in-memory/in-memory-todo-repository';
import { TodoRepository } from '../repositories/todo-repository';
import { Todo } from '../domain/todo';
import { CreateTodoUseCase } from './create-todo-use-case';

describe('CreateTodoUseCase (Unit)', () => {
  let sut: CreateTodoUseCase;
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
    sut = new CreateTodoUseCase(todoRepository);
  });

  it('should return a todo when a valid todo is provided', async () => {
    const todo = await sut.execute({
      title: 'Todo 4',
      description: 'Todo 4 description'
    });
    expect(todo).toEqual({ ...todo, id: 4, done: false });
  });
});
