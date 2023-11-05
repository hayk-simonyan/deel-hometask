const express = require('express');
const { getProfile } = require('../middleware/getProfile');
const {
  getContractById,
  getContracts,
} = require('../controllers/contractsController');
const { getUnpaidJobs, payForJob } = require('../controllers/jobsController');
const { depositBalance } = require('../controllers/balancesController');
const {
  getBestProfession,
  getBestClients,
} = require('../controllers/adminController');
const {
  validateGetContractById,
  validatePayJob,
  validateDeposit,
  validateBestProfession,
  validateBestClients,
} = require('../validators');
const handleValidationErrors = require('../middleware/handleValidationErrors');
const {
  adminRateLimiter,
  balanceRateLimiter,
  jobsRateLimiter,
  contractsRateLimiter,
} = require('../utils/rateLimiter');

const router = express.Router();

router.get(
  '/contracts/:id',
  contractsRateLimiter,
  validateGetContractById,
  handleValidationErrors,
  getProfile,
  getContractById
);
router.get('/contracts', contractsRateLimiter, getProfile, getContracts);
router.get('/jobs/unpaid', jobsRateLimiter, getProfile, getUnpaidJobs);
router.post(
  '/jobs/:id/pay',
  jobsRateLimiter,
  validatePayJob,
  handleValidationErrors,
  getProfile,
  payForJob
);
router.post(
  '/balances/deposit/:userId',
  balanceRateLimiter,
  validateDeposit,
  handleValidationErrors,
  depositBalance
);
router.get(
  '/admin/best-profession',
  adminRateLimiter,
  validateBestProfession,
  handleValidationErrors,
  getBestProfession
);
router.get(
  '/admin/best-clients',
  adminRateLimiter,
  validateBestClients,
  handleValidationErrors,
  getBestClients
);

module.exports = router;
