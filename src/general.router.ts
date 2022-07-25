import { FastifyInstance } from 'fastify';

export default function apiRouter(
  server: FastifyInstance,
  opts: Record<string, unknown>, // ?
  next: (err?: Error | undefined) => void
) {
  server.get('/ping', async (request, reply) => {
    return 'pong\n';
  });
  server.get('/error', async (request, reply) => {
    throw new Error('Sample Error');
  });
  next();
}
