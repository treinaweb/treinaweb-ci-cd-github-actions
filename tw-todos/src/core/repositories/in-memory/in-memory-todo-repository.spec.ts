import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryTodoRepository } from './in-memory-todo-repository';
import { Todo } from '@/core/domain/todo';

describe('InMemoryTodoRepository (Unit)', () => {
  let sut: InMemoryTodoRepository;
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
    sut = new InMemoryTodoRepository(todos);
  });

  it('should be able to return all todos', () => {
    expect(sut.getAll()).resolves.toEqual(todos);
  });

  it('should be able to return a todo by id', () => {
    expect(sut.getById(1)).resolves.toEqual(todos[0]);
  });

  it('should be able to return null when todo is not found', () => {
    expect(sut.getById(4)).resolves.toBeNull();
  });

  it('should be able to create a todo', () => {
    const todo = {
      title: 'Todo 4',
      description: 'Todo 4 description',
      done: false
    };
    expect(sut.create(todo)).resolves.toEqual({ ...todo, id: 4 });
  });

  it('should be able to delete a todo', () => {
    expect(sut.delete(1)).resolves.toBeUndefined();
    expect(sut.getById(1)).resolves.toBeNull();
  });

  it('should be able to update a todo', () => {
    const todo = {
      id: 1,
      title: 'Todo 1 Edited',
      description: 'Todo 1 description edited',
      done: true
    };
    expect(sut.update(todo, 1)).resolves.toEqual(todo);
  });

  it('should be able to return null when todo is not found', () => {
    const todo = {
      id: 4,
      title: 'Todo 1 Edited',
      description: 'Todo 1 description edited',
      done: true
    };
    expect(sut.update(todo, 4)).resolves.toBeNull();
  });
});
