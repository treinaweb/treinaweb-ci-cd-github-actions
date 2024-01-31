import { app } from '@/app';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('TodoController (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Get all todos must return status 200', async () => {
    const response = await request(app.server)
      .get('/api/todos')
      .send();

    expect(response.status).toBe(200);
  });

  it('Get todo by id must return status 200', async () => {
    const response = await request(app.server)
      .get('/api/todos/1')
      .send();

    expect(response.status).toBe(200);
  });

  it('Get todo by id must return status 404 when todo is not found', async () => {
    const response = await request(app.server)
      .get('/api/todos/4')
      .send();

    expect(response.status).toBe(404);
  });

  it('Create todo must return status 201', async () => {
    const response = await request(app.server)
      .post('/api/todos')
      .send({
        title: 'Todo 4',
        description: 'Todo 4 description'
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      title: 'Todo 4',
      description: 'Todo 4 description',
      done: false
    });
  });

  it('Create todo must return status 400 when title is not provided', async () => {
    const response = await request(app.server)
      .post('/api/todos')
      .send({
        description: 'Todo 4 description'
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      errors: [
        {
          field: 'title',
          error: expect.any(String)
        }
      ]
    });
  });

  it('Create todo must return status 400 when description is not provided', async () => {
    const response = await request(app.server)
      .post('/api/todos')
      .send({
        title: 'Todo 4'
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: 'Validation error',
      errors: [
        {
          field: 'description',
          error: expect.any(String)
        }
      ]
    });
  });

  it('Delete todo by id must return status 204', async () => {
    const response = await request(app.server)
      .delete('/api/todos/1')
      .send();

    expect(response.status).toBe(204);
  });

  it('Delete todo by id must return status 404 when todo is not found', async () => {
    const response = await request(app.server)
      .delete('/api/todos/4')
      .send();

    expect(response.status).toBe(404);
  });

  it('Set todo has done should return 204', async () => {
    const creationResponse = await request(app.server)
      .post('/api/todos')
      .send({
        title: 'Todo 4',
        description: 'Todo 4 description'
      });
    const { id } = creationResponse.body;
    const response = await request(app.server)
      .patch(`/api/todos/${ id }/done`)
      .send();

    expect(response.status).toBe(204);
  });

  it('Set todo has done should return 404 when todo is not found', async () => {
    const response = await request(app.server)
      .patch('/api/todos/100/done')
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      message: 'Todo not found'
    });
  });
});
