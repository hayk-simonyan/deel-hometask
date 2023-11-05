const rateLimit = require('express-rate-limit');

const adminRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
});

const balanceRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many requests for balance operations, please try again later',
});

const jobsRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 15, // limit each IP to 15 requests per windowMs for jobs
  message: 'Too many requests for job operations, please try again later',
});

const contractsRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per windowMs for contracts
  message: 'Too many requests for contract operations, please try again later',
});

module.exports = {
  adminRateLimiter,
  balanceRateLimiter,
  jobsRateLimiter,
  contractsRateLimiter,
};
