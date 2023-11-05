const {
  fetchAndAuthorizeContract,
  fetchNonTerminatedContracts,
} = require('../services/contractService');
const { NotFoundError, UnauthorizedError } = require('../utils/errorTypes');

/**
 * @route GET /contracts/:id
 * @middleware getProfile
 * @description Returns the contract by its ID if it belongs to the authenticated profile (either as a client or contractor).
 * @param {number} id - Contract ID.
 * @returns {Object} Contract details if found and accessible by the profile.
 * @throws {404} If the contract is not found.
 * @throws {403} If the profile does not have permission to view the contract.
 * @throws {500} If an unexpected error occurs.
 */
exports.getContractById = async (req, res, next) => {
  const { id } = req.params;
  const profileId = req.profile.id;

  try {
    const contract = await fetchAndAuthorizeContract(id, profileId);
    res.json(contract);
  } catch (error) {
    if (error instanceof NotFoundError || error instanceof UnauthorizedError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    next(error);
  }
};

/**
 * @route GET /contracts
 * @middleware getProfile
 * @description Returns a list of non-terminated contracts belonging to the authenticated profile (either as a client or contractor).
 * @returns {Array} Array of non-terminated contracts if found and accessible by the profile.
 * @throws {404} If no contracts are found.
 * @throws {500} If an unexpected error occurs.
 */
exports.getContracts = async (req, res, next) => {
  const profileId = req.profile.id;
  try {
    const contracts = await fetchNonTerminatedContracts(profileId);

    if (contracts.length === 0) {
      return res.status(404).end();
    }

    res.json(contracts);
  } catch (error) {
    next(error);
  }
};
