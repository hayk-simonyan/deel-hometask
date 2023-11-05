const { sequelize } = require('../model');
const {
  getUnpaidJobsForProfile,
  payForJobById,
} = require('../services/jobService');

/**
 * @route GET /jobs/unpaid
 * @middleware getProfile
 * @description Returns all unpaid jobs for the authenticated user (either as a client or contractor), for active contracts only.
 * @returns {Array} List of unpaid jobs for active contracts.
 * @throws {500} If an unexpected error occurs.
 */
exports.getUnpaidJobs = async (req, res, next) => {
  const { id } = req.profile;

  try {
    const unpaidJobs = await getUnpaidJobsForProfile(id);
    res.json(unpaidJobs);
  } catch (error) {
    next(error);
  }
};

/**
 * @route POST /jobs/:id/pay
 * @middleware getProfile
 * @description Pay for a job, a client can only pay if his balance >= the amount to pay.
 * @param {number} id - Job ID which will be payed
 * @returns {Object} Success message if the payment is successful.
 * @throws {400} If the profile is not a client, the balance is insufficient, the job ID is invalid, or the job has already been paid.
 * @throws {404} If the job or associated contract is not found.
 * @throws {500} If an unexpected error occurs during the payment process.
 */
exports.payForJob = async (req, res, next) => {
  const { id: jobId } = req.params;
  const { id: clientId } = req.profile;

  if (req.profile.type !== 'client') {
    return res.status(400).json({ error: 'Only clients can pay for a job.' });
  }

  const transaction = await sequelize.transaction();

  try {
    await payForJobById(clientId, jobId, transaction);
    await transaction.commit();
    res.json({ success: 'Payment successful!' });
  } catch (error) {
    await transaction.rollback();
    next(error);
  }
};
