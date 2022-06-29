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

  it('POST /api/v1/items creates a new item', async () => {
    const resp = await request(app).post('/api/v1/items').send({ item: 'apples', amount: 4 }); 
    expect(resp.status).toEqual(200);
    expect(resp.body).toEqual({
      id: expect.any(String),
      item: 'apples',
      amount: 4,
      user_id: null,
      bought: false,
    });
  });
  it('PUT /api/v1/items modifies an existing item', async () => {
    const res = await request(app).put('/api/v1/items/1').send({ item: true });
    expect(res.status).toBe(200);
    expect(res.body.bought).toEqual(true);
  });

  afterAll(() => {
    pool.end();
  });
});
