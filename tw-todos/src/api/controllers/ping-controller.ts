import { FastifyReply, FastifyRequest } from 'fastify';

export class PingController {
  static ping(_: FastifyRequest, reply: FastifyReply) {
    reply.send({ message: 'pong' });
  }
}
