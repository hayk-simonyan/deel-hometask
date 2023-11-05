import React, { useState } from 'react';

export function AdminPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [limit, setLimit] = useState(3);
  const [bestProfession, setBestProfession] = useState(null);
  const [bestClients, setBestClients] = useState([]);
  const [errorBestProfession, setErrorBestProfession] = useState(null);
  const [errorBestClients, setErrorBestClients] = useState(null);

  const handleBestProfession = () => {
    setErrorBestProfession(null);
    fetch(
      `${
        process.env.REACT_APP_API_URL
      }/admin/best-profession?start=${encodeURIComponent(
        startDate
      )}&end=${encodeURIComponent(endDate)}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch the best profession');
        }
        return response.json();
      })
      .then((data) => {
        setBestProfession(data.profession);
      })
      .catch((error) => {
        console.error(error);
        setErrorBestProfession(error.message);
      });
  };

  const handleBestClients = (limit) => {
    setErrorBestClients(null);
    fetch(
      `${
        process.env.REACT_APP_API_URL
      }/admin/best-clients?start=${encodeURIComponent(
        startDate
      )}&end=${encodeURIComponent(endDate)}&limit=${limit}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch the best clients');
        }
        return response.json();
      })
      .then((data) => {
        setBestClients(data);
      })
      .catch((error) => {
        console.error(error);
        setErrorBestClients(error.message);
      });
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Best Profession</h2>
        <label>
          Start Date:
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <hr />
        <label>
          End Date:
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <hr />
        <button
          onClick={handleBestProfession}
          disabled={!startDate || !endDate}
        >
          Find Best Profession
        </button>
        {errorBestProfession && (
          <div className='alert alert-danger' role='alert'>
            {errorBestProfession}
          </div>
        )}
        {bestProfession && <p>Best Profession: {bestProfession}</p>}
      </div>
      <div>
        <h2>Best Clients</h2>
        <label>
          Limit:
          <input
            type='number'
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </label>
        <hr />
        <button
          onClick={() => handleBestClients(limit)}
          disabled={!startDate || !endDate || limit <= 0}
        >
          Find Best Clients
        </button>
        {errorBestClients && (
          <div className='alert alert-danger' role='alert'>
            {errorBestClients}
          </div>
        )}
        <ul>
          {bestClients.map((client) => (
            <li key={client.id}>
              {client.fullName} - {client.paid}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
