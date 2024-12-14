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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>

      <div>
        <label>Filter: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <ul>
        {filteredTransactions.map((transaction) => (
          <li key={transaction.id}>
            {transaction.description} - ${transaction.amount.toFixed(2)} ({transaction.category})
            <button onClick={() => deleteTransaction(transaction.id)}>Delete</button>
            <button
              onClick={() =>
                updateTransaction(transaction.id, {
                  ...transaction,
                  description: prompt('Update Description', transaction.description) || transaction.description,
                  amount: parseFloat(prompt('Update Amount', transaction.amount)) || transaction.amount,
                })
              }
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