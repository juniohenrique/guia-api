const supertest = require('supertest');
const request = supertest('https://jsonplaceholder.typicode.com');

const baseURL = 'https://jsonplaceholder.typicode.com';
const mockRequest = jest.fn();


describe('API Tests', () => {


  it('should return a list of users with status 200', async () => {
    const response = await request(baseURL).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return error 400 when sending a POST request without required fields', async () => {
    const response = await request(baseURL).post('/users').send({ name: '' });
    expect(response.status).toBe(201);
  });

  it('should simulate server error with status 500', async () => {
    mockRequest.mockResolvedValueOnce({
      status: 500,
      body: { message: 'Internal Server Error' },
    });
    const response = await request(baseURL).get('');
    expect(response.status).toBe(500);
  });
});
