const request = require('supertest');
const app = require('../app');

describe('GET /contracts/:id', () => {
  const profileId = 1;

  it('should return the contract by its ID if it belongs to the authenticated profile', async () => {
    const contractId = 1;
    const res = await request(app)
      .get(`/contracts/${contractId}`)
      .set('profile_id', profileId);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', contractId);
  });

  it('should return 404 if the contract is not found', async () => {
    const contractId = 999;
    const res = await request(app)
      .get(`/contracts/${contractId}`)
      .set('profile_id', profileId);

    expect(res.statusCode).toEqual(404);
  });

  it('should return 403 if the profile does not have permission to view the contract', async () => {
    const contractId = 6;
    const res = await request(app)
      .get(`/contracts/${contractId}`)
      .set('profile_id', profileId);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty(
      'error',
      'You do not have permission to view this contract'
    );
  });
});

describe('GET /contracts', () => {
  const profileId = 1;

  it('should return a list of non-terminated contracts belonging to the authenticated profile', async () => {
    const res = await request(app)
      .get('/contracts')
      .set('profile_id', profileId);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body[0]).toHaveProperty('status');
    expect(res.body[0].status).not.toEqual('terminated');
  });

  it('should return 404 if no contracts are found', async () => {
    const invalidProfileId = 5;
    const res = await request(app)
      .get('/contracts')
      .set('profile_id', invalidProfileId);

    expect(res.statusCode).toEqual(404);
  });
});
