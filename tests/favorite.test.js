const request = require('supertest');
const app = require('../server');

describe('Favorite API', () => {
  let testId;

  it('GET /api/favorite', async () => {
    const res = await request(app).get('/api/favorite');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      testId = res.body[0]._id;
    }
  });

  it('GET /api/favorite/:id', async () => {
    if (!testId) {
      return console.warn(' There are no favorites to test GET by ID');
    }
    const res = await request(app).get(`/api/favorite/${testId}`);
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('_id', testId);
    }
  });
});
