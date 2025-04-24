const { createUser } = require('../src/services/userService');

describe('User Service', () => {
  it('should create a user with valid input', async () => {
    const user = await createUser({ email: 'a@a.com', name: 'Test', password: 'password123' });
    expect(user).toHaveProperty('id');
  });
});
