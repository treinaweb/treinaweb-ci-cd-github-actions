import { prisma } from '@/config/db/prisma';
import { Todo } from '@/core/domain/todo';
import { TodoRepository } from '../todo-repository';

export class PrismaTodoRepository implements TodoRepository {

  async update(todo: Todo, id: number): Promise<Todo | null> {
    return await prisma.todo.update({ where: { id }, data: todo });
  }

  async getAll(): Promise<Todo[]> {
    return await prisma.todo.findMany();
  }

  async getById(id: number): Promise<Todo | null> {
    return await prisma.todo.findUnique({ where: { id } });
  }

  async create(todo: Todo): Promise<Todo> {
    return await prisma.todo.create({ data: todo });
  }

  async delete(id: number): Promise<void> {
    await prisma.todo.delete({ where: { id } });
  }

}
