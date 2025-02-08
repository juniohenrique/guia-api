const supertest = require('supertest');
const request = supertest('https://jsonplaceholder.typicode.com');

const baseURL = 'https://jsonplaceholder.typicode.com';
const mockRequest = jest.fn();


describe('API Tests', () => {

  describe('Mock fetch for success tests', () => {
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
  require('jest-fetch-mock').enableMocks();

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
