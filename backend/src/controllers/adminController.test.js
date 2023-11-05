const request = require('supertest');
const app = require('../app');

describe('GET /admin/best-profession', () => {
  it('should return the best profession for the given date range', async () => {
    const start = '2020-01-01';
    const end = '2023-07-01';
    const res = await request(app).get(
      `/admin/best-profession?start=${start}&end=${end}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('profession');
    expect(res.body).toHaveProperty('totalEarnings');
  });

  it('should return 400 error if start or end date is not provided', async () => {
    const res = await request(app).get('/admin/best-profession');
    expect(res.statusCode).toEqual(400);
  });
});

describe('GET /admin/best-clients', () => {
  it('should return the best clients for the given date range', async () => {
    const start = '2020-01-01';
    const end = '2023-07-01';
    const res = await request(app).get(
      `/admin/best-clients?start=${start}&end=${end}`
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('fullName');
    expect(res.body[0]).toHaveProperty('paid');
  });

  it('should return 400 error if start or end date is not provided', async () => {
    const res = await request(app).get('/admin/best-clients');
    expect(res.statusCode).toEqual(400);
  });
});
