import React, { useState, useEffect } from 'react';

export function ContractsPage() {
  const [contracts, setContracts] = useState([]);
  const [selectedContract, setSelectedContract] = useState(null);
  const [error, setError] = useState(null);
  const profile_id = localStorage.getItem('profile_id');

  useEffect(() => {
    setError(null);
    fetch(`${process.env.REACT_APP_API_URL}/contracts`, {
      headers: { profile_id },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load contracts');
        }
        return response.json();
      })
      .then((data) => setContracts(data))
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  }, [profile_id]);

  const viewContractDetails = (contractId) => {
    setError(null);
    fetch(`${process.env.REACT_APP_API_URL}/contracts/${contractId}`, {
      headers: { profile_id },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load contract details');
        }
        return response.json();
      })
      .then((data) => setSelectedContract(data))
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Contracts</h1>
      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      {selectedContract ? (
        <div>
          <h2>Contract Details</h2>
          <p>{selectedContract.id}</p>
          <p>{selectedContract.terms}</p>
          <p>{selectedContract.status}</p>
          <button onClick={() => setSelectedContract(null)}>
            Back to List
          </button>
        </div>
      ) : (
        <div>
          <ul>
            {contracts.map((contract) => (
              <li key={contract.id}>
                {contract.id} - {contract.status}{' '}
                <button onClick={() => viewContractDetails(contract.id)}>
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
