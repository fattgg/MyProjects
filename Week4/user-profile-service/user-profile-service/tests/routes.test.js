const request = require('supertest');
const app = require('../app'); // Not server.js!

describe('POST /users', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/users')
      .send({ email: 'test@test.com', password: '123456', name: 'Test' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});
