import fastify from 'fastify';
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts';
import compress from '@fastify/compress';
import caching from '@fastify/caching';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';

const { log, dir } = console;

(async function main(port = 8080) {
  const server = fastify({
    logger: {
      level: 'trace', //  "fatal" | "error" | "warn" | "info" | "debug" | "trace";
      // serializers?: { [key: string]: SerializerFn };
      // customLevels?: { [key: string]: number };
      // formatters?: {
      //     level?: (label: string, number: number) => object;
      //     bindings?: (bindings: Bindings) => object;
      //     log?: (object: object) => object;
      // };
      // redact?: string[] | redactOptions; // { paths: string[], censor?: string |((value: any, path: string[]) => any),  remove?: boolean }
    },
    // defaults
    // ajv: {
    //   customOptions: {
    //     removeAdditional: true,
    //     useDefaults: true,
    //     coerceTypes: true,
    // nullable: true,
    // },
    // },
  }).withTypeProvider<JsonSchemaToTsProvider>();

  // plugins
  // global - default
  server.register(compress, { global: true });
  server.register(caching, { privacy: caching.privacy.NOCACHE });
  server.register(cors);
  server.register(helmet);
  // routes
  server.register(require('./api.router'), { prefix: 'api/v1' });
  server.register(require('./general.router'), { prefix: '/' });
  // start
  try {
    await server.listen({ port });
  } catch (err) {
    log('!> Server caught an error:');
    dir(err);
  }
  return server;
})();
