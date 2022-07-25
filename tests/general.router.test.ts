import getPort from 'get-port';

import { server } from '../src/server';
import { FastifyServer } from '../src/types';

let serverApp: FastifyServer | undefined;

describe('[SERVER]', () => {
  beforeAll(async () => {
    const port = await getPort();

    serverApp = await server(port);
  });
  afterAll(async () => {
    if (serverApp) serverApp.close();
  });
  it('starts and provides ping', async () => {
    const response = await serverApp?.inject({ method: 'GET', url: '/ping' });

    expect(response?.body).toStrictEqual('pong');
  });
});
