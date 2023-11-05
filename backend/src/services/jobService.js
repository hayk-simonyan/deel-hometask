const { Job, Contract, Profile } = require('../model');
const { Op } = require('sequelize');
const {
  NotFoundError,
  PaymentError,
  ForbiddenError,
} = require('../utils/errorTypes');

const getUnpaidJobsForProfile = async (profileId) => {
  return Job.findAll({
    where: { paid: false },
    include: [
      {
        model: Contract,
        where: {
          [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
          status: 'in_progress',
        },
      },
    ],
  });
};

const payForJobById = async (clientId, jobId, transaction) => {
  const job = await Job.findOne({ where: { id: jobId } });
  if (!job) throw new NotFoundError('Job not found');
  if (job.paid) throw new PaymentError('Job already paid');

  const contract = await Contract.findOne({ where: { id: job.ContractId } });
  if (!contract) throw new NotFoundError('Contract not found');
  if (contract.status !== 'in_progress')
    throw new ForbiddenError('Contract is not active');
  if (contract.ClientId !== clientId)
    throw new ForbiddenError('Client not authorized on this contract');

  const contractor = await Profile.findOne({
    where: { id: contract.ContractorId },
  });
  if (!contractor) throw new NotFoundError('Contractor not found');

  const client = await Profile.findOne({ where: { id: clientId } });
  if (!client) throw new NotFoundError('Client not found');
  if (client.balance < job.price)
    throw new PaymentError('Insufficient balance');

  // Proceed with the payment transaction
  client.balance -= job.price;
  contractor.balance += job.price;

  await client.save({ transaction });
  await contractor.save({ transaction });

  job.paid = true;
  job.paymentDate = new Date();
  await job.save({ transaction });

  return job;
};

module.exports = {
  getUnpaidJobsForProfile,
  payForJobById,
};
