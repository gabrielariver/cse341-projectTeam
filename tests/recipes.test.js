const request = require('supertest');
const app = require('../server'); 

describe('GET /api/recipes', () => {
  it('should return an array (even if empty)', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
