import { FastifyInstance } from 'fastify';

export default function apiRouter(
  server: FastifyInstance,
  _opts: Record<string, unknown>, // ?
  next: (err?: Error | undefined) => void,
) {
  server.get('/ping', async (_request, _reply) => {
    return 'pong';
  });
  server.get('/error', async (_request, _reply) => {
    throw new Error('Sample Error');
  });
  next();
}
