import React, { useState } from 'react';

function IncomeExpenseForm({ transactions, addTransaction, deleteTransaction, updateTransaction }) {
  const [formData, setFormData] = useState({
    id: '',
    description: '',
    amount: '',
    category: 'income',
  });
  const [filter, setFilter] = useState('all');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
      alert('Please enter a valid description and positive amount.');
      return;
    }
    const newTransaction = {
      ...formData,
      id: Date.now(),
      amount: parseFloat(formData.amount),
    };
    addTransaction(newTransaction);
    setFormData({ id: '', description: '', amount: '', category: 'income' });
  };

  const filteredTransactions =
    filter === 'all'
      ? transactions
      : transactions.filter((transaction) => transaction.category === filter);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="form-input"
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="form-input"
        />
        <select name="category" value={formData.category} onChange={handleChange} className="form-select">
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit" className="form-button">Add Transaction</button>
      </form>

      <div className="filter-container">
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="form-select">
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <ul className="transaction-list">
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            <span className="transaction-description">{transaction.description}</span>
            <span className="transaction-amount">${transaction.amount.toFixed(2)}</span>
            <span className="transaction-category">({transaction.category})</span>
            <button onClick={() => deleteTransaction(transaction.id)} className="action-button">Delete</button>
            <button
              onClick={() =>
                updateTransaction(transaction.id, {
                  ...transaction,
                  description: prompt('Update Description', transaction.description) || transaction.description,
                  amount: parseFloat(prompt('Update Amount', transaction.amount)) || transaction.amount,
                })
              }
              className="action-button"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IncomeExpenseForm;