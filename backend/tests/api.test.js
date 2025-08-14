const request = require('supertest');
const { server } = require('../server'); // Import the server instance for supertest

afterAll(() => {
  server.close(); // Close server after tests to free port and resources
});

describe('GET /logs endpoint tests', () => {
  it('should return all logs without filters', async () => {
    const response = await request(server).get('/logs');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should filter logs by level error', async () => {
    const response = await request(server).get('/logs').query({ level: 'error' });
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((log) => {
      expect(log.level).toBe('error');
    });
  });

  it('should return 400 for invalid filter parameters', async () => {
    // Assuming app returns 400 for invalid level values.
    const response = await request(server).get('/logs').query({ level: 'invalid_level' });
    expect(response.statusCode).toBe(400);
  });
});
