import { dir, log } from 'console';
import { FastifyInstance } from 'fastify';
import { randomUUID } from 'crypto';
import { performance } from 'perf_hooks';

import { User, UserSchema } from './types';

export default function apiRouter(
  server: FastifyInstance,
  _opts: Record<string, unknown>, // ?
  next: (err?: Error | undefined) => void,
) {
  server.post<{ Body: User }>(
    '/auth',
    {
      schema: {
        body: UserSchema,
        // response to the request
        response: {
          200: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              requestId: { type: 'string' },
            },
          },
        },
      },
      onRequest: (request, _reply, done) => {
        log('>>> onRequest');
        request.id = randomUUID();
        performance.mark(`${request.id}-start`);
        done();
      },
      onResponse: (request, _reply, done) => {
        const measure = performance.measure(request.id, `${request.id}-start`);

        log('>>> onResponse, request performance:');
        dir(measure);
        done();
      },
      preValidation: (request, _reply, done) => {
        log(`>>> preValidation for ${request.id}`);
        done();
      },
      preHandler: (request, _reply, done) => {
        log(`>>> perHandler for ${request.id}`);
        done();
      },
    },
    (request, reply) => {
      log('>>> handler');

      const { firstName, lastName } = request.body;

      reply.status(200).send({ requestId: request.id, name: `${lastName}, ${firstName}` });
    },
  );
  next();
}
