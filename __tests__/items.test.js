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

  it('GET /api/v1/items/:id list of item for an existing user', async () => {
    const resp = await request(app).get('/api/v1/items/1');
    expect(resp.status).toEqual(200);
    expect(resp.body.item).toEqual('bread');
  });

  it('POST /api/v1/items creates a new item', async () => {
    const resp = await request(app)
      .post('/api/v1/items')
      .send({ item: 'apples', amount: 4 });
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
    const res = await request(app)
      .put('/api/v1/items/1')
      .send({ bought: true });
    expect(res.status).toBe(200);
    expect(res.body.bought).toEqual(true);
  });

  it('DELETE /api/v1/items/:id deletes item associated with authenticated user', async () => {
    const createRes = await request(app)
      .put('/api/v1/items/1')
      .send({ item: 'bananas', amount: 13 });
    expect(createRes.status).toEqual(200);
    const res = await request(app).delete('/api/v1/items/1');
    expect(res.status).toEqual(200);
    // const { body } = await request(app).get('/api/v1/items/1');
    // expect(body.status).toEqual(404);
  });

  afterAll(() => {
    pool.end();
  });
});
