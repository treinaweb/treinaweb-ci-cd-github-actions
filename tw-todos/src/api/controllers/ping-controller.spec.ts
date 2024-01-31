import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('PingController (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Ping must return status 200 and pong message', async () => {
    const response = await request(app.server)
      .get('/api/ping')
      .send();

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'pong' });
  });
});
