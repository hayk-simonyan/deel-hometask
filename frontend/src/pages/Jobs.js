import React, { useState, useEffect } from 'react';

export function JobsPage() {
  const [unpaidJobs, setUnpaidJobs] = useState([]);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const profile_id = localStorage.getItem('profile_id');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/jobs/unpaid`, {
      headers: { profile_id },
    })
      .then((response) => response.json())
      .then((data) => setUnpaidJobs(data))
      .catch((error) => console.error(error));
  }, [profile_id]);

  const payForJob = (jobId) => {
    if (isPaying) return;

    setIsPaying(true);
    setError(null);
    setSuccessMessage(null);

    fetch(`${process.env.REACT_APP_API_URL}/jobs/${jobId}/pay`, {
      method: 'POST',
      headers: { profile_id },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Payment failed');
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          setUnpaidJobs(unpaidJobs.filter((job) => job.id !== jobId));
          setSuccessMessage('Payment successful!');
        } else {
          setError('Payment failed: ' + (data.message || 'Unknown error'));
        }
      })
      .catch((error) => {
        setError('Payment failed: ' + error.message);
      })
      .finally(() => {
        setIsPaying(false);
      });
  };

  return (
    <div>
      <h1>Unpaid Jobs</h1>
      {error && (
        <div className='alert alert-danger' role='alert'>
          {error}
        </div>
      )}
      {successMessage && (
        <div className='alert alert-success' role='alert'>
          {successMessage}
        </div>
      )}
      <ul>
        {unpaidJobs.map((job) => (
          <li key={job.id}>
            {job.description} - ${job.price.toFixed(2)}{' '}
            <button onClick={() => payForJob(job.id)}>Pay</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
