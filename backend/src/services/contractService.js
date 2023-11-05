const { Op } = require('sequelize');
const { Contract } = require('../model');
const { NotFoundError, UnauthorizedError } = require('../utils/errorTypes');

async function fetchAndAuthorizeContract(contractId, profileId) {
  const contract = await fetchContractById(contractId);
  if (!contract) {
    throw new NotFoundError('Contract not found');
  }

  if (contract.ClientId !== profileId && contract.ContractorId !== profileId) {
    throw new UnauthorizedError(
      'You do not have permission to view this contract'
    );
  }

  return contract;
}

async function fetchNonTerminatedContracts(profileId) {
  return await Contract.findAll({
    where: {
      [Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      status: {
        [Op.ne]: 'terminated',
      },
    },
  });
}

async function fetchContractById(id) {
  return await Contract.findOne({ where: { id } });
}

module.exports = {
  fetchNonTerminatedContracts,
  fetchAndAuthorizeContract,
};
