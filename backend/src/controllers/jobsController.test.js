const request = require('supertest');
const app = require('../app');

describe('GET /jobs/unpaid', () => {
  const profileId = 1;

  it('should return all unpaid jobs for the authenticated user (either as a client or contractor), for active contracts only', async () => {
    const res = await request(app)
      .get('/jobs/unpaid')
      .set('profile_id', profileId);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe('POST /jobs/:id/pay', () => {
  const profileId = 1;

  it('should successfully pay for a job if the client balance >= the amount to pay', async () => {
    const jobId = 2;
    const res = await request(app)
      .post(`/jobs/${jobId}/pay`)
      .set('profile_id', profileId);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', 'Payment successful!');
  });

  it('should return 400 if the profile is not a client', async () => {
    const jobId = 1;
    const invalidProfileId = 5;
    const res = await request(app)
      .post(`/jobs/${jobId}/pay`)
      .set('profile_id', invalidProfileId);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('error', 'Only clients can pay for a job.');
  });

  it('should return 404 if the job is not found', async () => {
    const jobId = 999;
    const res = await request(app)
      .post(`/jobs/${jobId}/pay`)
      .set('profile_id', profileId);

    expect(res.statusCode).toEqual(404);
  });
});
