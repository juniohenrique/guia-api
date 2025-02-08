// Install jest-fetch-mock
// npm install jest-fetch-mock

require('jest-fetch-mock').enableMocks();

describe('Mock fetch for 500 error', () => {
  beforeEach(() => {
    fetch.mockResponseOnce(
      JSON.stringify({ message: 'Internal Server Error' }),
      { status: 500 }
    );
  });

  it('should mock 500 Internal Server Error with fetch', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    const body = await response.json();
    expect(response.status).toBe(500);
    expect(body.message).toBe('Internal Server Error');
  });
});
