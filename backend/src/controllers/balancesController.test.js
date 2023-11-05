const request = require('supertest');
const app = require('../app');

describe('POST /balances/deposit/:userId', () => {
  it('should successfully deposit money into the balance of a client', async () => {
    const userId = 2;
    const amount = 10;
    const res = await request(app)
      .post(`/balances/deposit/${userId}`)
      .send({ amount })
      .set('profile_id', 1);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Deposit successful.');
    expect(res.body).toHaveProperty('balance');
  });

  it('should return 403 if the user trying to deposit is not a client', async () => {
    const userId = 5;
    const amount = 10;
    const res = await request(app)
      .post(`/balances/deposit/${userId}`)
      .send({ amount });
    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty(
      'error',
      'You do not have permission to deposit into this account.'
    );
  });

  it('should return 400 if the deposit amount is invalid or exceeds the allowed limit', async () => {
    const userId = 1;
    const amount = 1000;
    const res = await request(app)
      .post(`/balances/deposit/${userId}`)
      .send({ amount })
      .set('profile_id', userId);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      'error',
      'Invalid deposit amount. It must not exceed 25% of the total unpaid jobs.'
    );
  });
});
