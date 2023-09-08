import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';

// Simulated asynchronous API call to fetch transaction data
const fetchTransactionData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const transactionData = [
        { customerId: 1, transactionDate: '2023-07-01', amount: 120 },
        { customerId: 1, transactionDate: '2023-07-15', amount: 80 },
        { customerId: 1, transactionDate: '2023-08-01', amount: 60 },
        // Add more transaction data for other customers and months
      ];
      resolve(transactionData);
    }, 1000); // Simulating 1 second delay
  });
};

const App = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTransactionData();
      setTransactionData(data);
    };

    fetchData();
  }, []);

  // Calculate reward points for each customer per month
  const calculateRewardPoints = () => {
    const monthlyRewardPoints = {};

    transactionData.forEach((transaction) => {
      const { customerId, transactionDate, amount } = transaction;
      const month = new Date(transactionDate).toLocaleString('default', { month: 'long' });

      const points = Math.max(amount - 100, 0) * 2 + Math.max(Math.min(amount, 100) - 50, 0);
      
      if (!monthlyRewardPoints[customerId]) {
        monthlyRewardPoints[customerId] = {};
      }

      if (!monthlyRewardPoints[customerId][month]) {
        monthlyRewardPoints[customerId][month] = 0;
      }

      monthlyRewardPoints[customerId][month] += points;
    });

    return monthlyRewardPoints;
  };

  const monthlyRewardPoints = calculateRewardPoints();

  return (
    <div>
      <h2>Reward Points Calculator</h2>
      {Object.keys(monthlyRewardPoints).map((customerId) => (
        <div key={customerId}>
          <h3>Customer ID: {customerId}</h3>
          {Object.keys(monthlyRewardPoints[customerId]).map((month) => (
            <div key={month}>
              <h4>Month: {month}</h4>
              <p>Reward Points: {monthlyRewardPoints[customerId][month]}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default App;
