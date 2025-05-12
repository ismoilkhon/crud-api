import request from 'supertest';
import { server } from '../src/index';

describe('Users API', () => {
  let userId: string;

  afterAll(() => {
    server.close();
  });

  it('should get all users (empty array initially)', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should create a new user', async () => {
    const newUser = {
      username: 'John Doe',
      age: 30,
      hobbies: ['reading', 'gaming']
    };

    const response = await request(server)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(newUser);
    expect(response.body.id).toBeDefined();
    userId = response.body.id;
  });

  it('should get user by id', async () => {
    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(userId);
  });

  it('should update user', async () => {
    const updatedUser = {
      username: 'Jane Doe',
      age: 31,
      hobbies: ['painting']
    };

    const response = await request(server)
      .put(`/api/users/${userId}`)
      .send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedUser);
    expect(response.body.id).toBe(userId);
  });

  it('should delete user', async () => {
    const response = await request(server).delete(`/api/users/${userId}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 for deleted user', async () => {
    const response = await request(server).get(`/api/users/${userId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('User not found');
  });
});