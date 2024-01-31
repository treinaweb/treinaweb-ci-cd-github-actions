import fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { apiRoutes } from './api/routes';
import { NotFoundError } from './core/errors/not-found-error';

export const app = fastify();

app.register(apiRoutes, { prefix: '/api' });

app.setErrorHandler(
  (error: FastifyError, _: FastifyRequest, reply: FastifyReply) => {
    if (error instanceof NotFoundError) {
      reply.status(404).send({ message: error.message });
    } else if (error instanceof ZodError) {
      const errors = error.errors.map((error) => ({
        field: error.path.join('.'),
        error: error.message
      }));
      reply
        .status(400)
        .send({ message: 'Validation error', errors });
    } else {
      console.error(error);
    }

    reply.status(500).send({ message: 'Internal server error' });
  }
);
