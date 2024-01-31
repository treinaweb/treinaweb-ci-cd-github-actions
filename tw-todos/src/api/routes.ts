import { FastifyInstance } from 'fastify';
import { PingController } from './controllers/ping-controller';
import { TodoController } from './controllers/todo-controller';

export async function apiRoutes(app: FastifyInstance) {
  app.get('/ping', PingController.ping);

  app.get('/todos', TodoController.getAllTodos);
  app.get('/todos/:id', TodoController.getTodoById);
  app.post('/todos', TodoController.createTodo);
  app.delete('/todos/:id', TodoController.deleteTodoById);
  app.patch('/todos/:id/done', TodoController.setTodoHasDone);
}
