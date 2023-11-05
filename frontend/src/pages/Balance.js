import React, { useState } from 'react';

export function BalancePage() {
  const [amount, setAmount] = useState(9.5);
  const [userId, setUserId] = useState(1);
  const [message, setMessage] = useState('');

  const handleDeposit = (userId) => {
    fetch(`${process.env.REACT_APP_API_URL}/balances/deposit/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setMessage(data.error);
        } else {
          setMessage(`Deposit successful! New balance: ${data.balance}`);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Deposit Balance</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleDeposit(userId);
        }}
      >
        <label>
          User ID:
          <input
            type='number'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </label>
        <hr />
        <label>
          Amount:
          <input
            type='number'
            value={Number(amount).toFixed(2)}
            onChange={(e) => setAmount(e.target.value)}
            step='0.1'
            min='0.1'
          />
        </label>
        <button type='submit'>Deposit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
