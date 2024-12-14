import React from 'react';

function BudgetSummary({ transactions }) {
  const income = transactions
    .filter((transaction) => transaction.category === 'income')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.category === 'expense')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = income - expenses;

  return (
    <div className="summary-container">
      <h2>Budget Summary</h2>
      <p className="summary-item">Total Income: <span className="summary-income">${income.toFixed(2)}</span></p>
      <p className="summary-item">Total Expenses: <span className="summary-expenses">${expenses.toFixed(2)}</span></p>
      <p className="summary-item">Balance: <span className="summary-balance">${balance.toFixed(2)}</span></p>
    </div>
  );
}

export default BudgetSummary;