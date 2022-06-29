const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('GET /api/v1/items lists all items for authenticated users', async () => {
    const resp = await request(app).get('/api/v1/items');
    expect(resp.status).toEqual(200);
  });

  afterAll(() => {
    pool.end();
  });
});
