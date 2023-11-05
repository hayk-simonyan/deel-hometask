const { Profile, Job, Contract, sequelize } = require('../model');
const Decimal = require('decimal.js');

async function findClientProfile(userId) {
  const clientProfile = await Profile.findOne({
    where: { id: userId },
  });
  if (!clientProfile) {
    throw new Error('Client profile not found.');
  }
  return clientProfile;
}

async function calculateUnpaidJobsTotal(clientId) {
  return await Job.sum('price', {
    include: [
      {
        model: Contract,
        as: 'Contract',
        where: { status: 'in_progress', ClientId: clientId },
      },
    ],
    where: { paid: false },
  });
}

async function updateBalance(clientProfile, amount) {
  let balance = new Decimal(clientProfile.balance);
  balance = balance.plus(amount);
  clientProfile.balance = balance.toString();
  await clientProfile.save();
}

const processDepositTransaction = async (userId, amount) => {
  const clientProfile = await findClientProfile(userId);

  if (clientProfile.type !== 'client') {
    const error = new Error(
      'You do not have permission to deposit into this account.'
    );
    error.statusCode = 403;
    throw error;
  }

  const unpaidJobsTotal = await calculateUnpaidJobsTotal(clientProfile.id);

  if (amount <= 0 || amount > unpaidJobsTotal * 0.25) {
    const error = new Error(
      'Invalid deposit amount. It must not exceed 25% of the total unpaid jobs.'
    );
    error.statusCode = 400;
    throw error;
  }

  const transaction = await sequelize.transaction();
  try {
    await updateBalance(clientProfile, amount, transaction);
    await transaction.commit();
    return { newBalance: clientProfile.balance };
  } catch (error) {
    if (transaction) await transaction.rollback();
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  findClientProfile,
  calculateUnpaidJobsTotal,
  processDepositTransaction,
};
