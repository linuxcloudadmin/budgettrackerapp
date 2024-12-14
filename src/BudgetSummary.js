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
    <div>
      <h2>Budget Summary</h2>
      <p>Total Income: ${income.toFixed(2)}</p>
      <p>Total Expenses: ${expenses.toFixed(2)}</p>
      <p>Balance: ${balance.toFixed(2)}</p>
    </div>
  );
}

export default BudgetSummary;