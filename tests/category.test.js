const request = require('supertest');
const app = require('../server');

describe('Category API', () => {
  let testId;

  it('GET /api/category', async () => {
    const res = await request(app).get('/api/category');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      testId = res.body[0]._id;
    }
  });

  it('GET /api/category/:id', async () => {
    if (!testId) {
      return console.warn('There are no categories to test GET by ID');
    }
    const res = await request(app).get(`/api/category/${testId}`);
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('_id', testId);
    }
  });
});
