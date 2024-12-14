import React, { useState } from 'react';
import IncomeExpenseForm from './IncomeExpenseForm';
import BudgetSummary from './BudgetSummary';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === id ? updatedTransaction : transaction
      )
    );
  };

  return (
    <div className="App">
      <h1>Budget Tracker</h1>
      <IncomeExpenseForm
        transactions={transactions}
        addTransaction={addTransaction}
        deleteTransaction={deleteTransaction}
        updateTransaction={updateTransaction}
      />
      <BudgetSummary transactions={transactions} />
    </div>
  );
}

export default App;