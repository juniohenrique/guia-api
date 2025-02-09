const request = require('supertest');
const baseURL = 'https://jsonplaceholder.typicode.com';
require('jest-fetch-mock').enableMocks();



describe('API Tests', () => {

  describe('Mock fetch for success tests', () => {
    it('GET /users - Should return a list of users with status 200', async () => {
      const response = await request(baseURL).get('/users');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('GET /users/:id - Should return a specific user', async () => {
      const response = await request(baseURL).get('/users/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('email');
    });

    it('POST /users - Create a new user and verify response', async () => {
      const newUser = {
        name: 'Test User',
        username: 'testuser',
        email: 'testuser@email.com',
      };

      const response = await request(baseURL)
        .post('/users')
        .send(newUser)
        .set('Content-Type', 'application/json');

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newUser);
    });


  });

  describe('Mock fetch for 404 error', () => {
    it('should return error 404 when sending a POST request to incorrect url', async () => {
      const response = await request(baseURL).post('/1').send({ name: '' });
      expect(response.status).toBe(404);
    });
  });



  describe('Mock fetch for 500 error', () => {
    beforeEach(() => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: 'Internal Server Error' }),
        { status: 500 }
      );
    });

    it('should mock 500 Internal Server Error with fetch', async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/1');
      const body = await response.json();
      expect(response.status).toBe(500);
      expect(body.message).toBe('Internal Server Error');
    });
  });
});

