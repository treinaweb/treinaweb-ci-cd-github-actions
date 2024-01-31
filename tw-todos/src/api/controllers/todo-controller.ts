import { UseCaseFactory } from '@/config/factories/use-case-factory';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export class TodoController {

  static async getAllTodos(_: FastifyRequest, reply: FastifyReply) {
    const usecase = UseCaseFactory.getAllTodosUseCase;
    const todos = await usecase.execute();
    reply.send(todos);
  }

  static async getTodoById(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const paramSchema = z.object({
      id: z.coerce.number().int().positive()
    });

    const { id } = paramSchema.parse(request.params);

    const usecase = UseCaseFactory.getTodoByIdUseCase;
    const todo = await usecase.execute(id);

    reply.send(todo);
  }

  static async createTodo(request: FastifyRequest, reply: FastifyReply) {
    const createTodoSchema = z.object({
      title: z.string().min(3).max(50),
      description: z.string().min(3).max(255)
    });

    const todo = createTodoSchema.parse(request.body);

    const usecase = UseCaseFactory.createTodoUseCase;
    const newTodo = await usecase.execute(todo);

    reply.code(201).send(newTodo);
  }

  static async deleteTodoById(
    request: FastifyRequest,
    reply: FastifyReply
  ) {
    const paramSchema = z.object({
      id: z.coerce.number().int().positive()
    });

    const { id } = paramSchema.parse(request.params);

    const usecase = UseCaseFactory.deleteTodoByIdUseCase;
    await usecase.execute(id);

    reply.code(204).send();
  }

  static async setTodoHasDone(request: FastifyRequest, reply: FastifyReply) {
    const paramSchema = z.object({
      id: z.coerce.number().int().positive()
    });

    const { id } = paramSchema.parse(request.params);

    const usecase = UseCaseFactory.setTodoHasDoneUseCase;
    await usecase.execute(id);

    reply.code(204).send();
  }

}
