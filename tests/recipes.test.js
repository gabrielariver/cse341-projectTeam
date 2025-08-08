const request = require('supertest');
const app = require('../server');

describe('Recipes API', () => {
  let testId;

  it('GET /api/recipes -> should return an array (even if empty)', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0 && res.body[0]._id) {
      testId = res.body[0]._id;
    }
  });

  it('GET /api/recipes/:id -> should return one recipe or 404', async () => {
    if (!testId) {
      console.warn('No recipes to test GET by ID. Seed data or create one first.');
      return;
    }
    const res = await request(app).get(`/api/recipes/${testId}`);
    expect([200, 404]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('_id', testId);
    }
  });
});
