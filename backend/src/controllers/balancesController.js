const { processDepositTransaction } = require('../services/balanceService');

/**
 * @route POST /balances/deposit/:userId
 * @description Deposits money into the balance of a client,
 * with a restriction that the deposit cannot be more than 25% of the client's total unpaid jobs to pay.
 * @param {number} req.body.amount - The amount to be deposited.
 * @param {number} req.params.userId - User ID where the deposit will be sent
 * @returns {Object} Success message if the deposit is successful with the balance of a client
 * @throws {400} If the deposit amount is invalid or exceeds the allowed limit, or userId is invalid.
 * @throws {403} If the user who's trying to deposit is not a client.
 * @throws {404} If the client profile is not found.
 * @throws {500} If an unexpected error occurs.
 */
exports.depositBalance = async (req, res, next) => {
  const { userId } = req.params;
  const { amount } = req.body;

  try {
    const depositResult = await processDepositTransaction(userId, amount);

    res.json({
      message: 'Deposit successful.',
      balance: depositResult.newBalance,
    });
  } catch (error) {
    next(error);
  }
};
