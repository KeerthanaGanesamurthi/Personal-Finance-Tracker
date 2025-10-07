import React, { useState } from 'react';

const TransactionList = ({ transactions, onUpdateTransaction, onDeleteTransaction, filter, setFilter, sortBy, setSortBy }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const startEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({ ...transaction });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    onUpdateTransaction(editingId, editForm);
    setEditingId(null);
    setEditForm({});
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) : value
    }));
  };
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="card transactions-card">
      <div className="card-header">
        <h2>Recent Transactions</h2>
        <div className="controls">
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>

      <div className="transactions-list">
        {transactions.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💸</div>
            <p>No transactions yet</p>
            <small>Add your first transaction to get started</small>
          </div>
        ) : (
          transactions.map(transaction => (
            <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
              {editingId === transaction.id ? (
                <div className="edit-form">
                  <input
                    type="text"
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="edit-input"
                  />
                  <input
                    type="number"
                    name="amount"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    step="0.01"
                    className="edit-input"
                  />
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="edit-input"
                  >
                    <option value="Food">Food</option>
                    <option value="Transport">Transport</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Salary">Salary</option>
                  </select>
                  <div className="edit-actions">
                    <button onClick={saveEdit} className="btn-save">Save</button>
                    <button onClick={cancelEdit} className="btn-cancel">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="transaction-info">
                    <div className="transaction-main">
                      <h4>{transaction.description}</h4>
                      <span className="transaction-category">{transaction.category}</span>
                    </div>
                    <div className="transaction-meta">
                      <span className="transaction-date">{formatDate(transaction.date)}</span>
                      <span className={`transaction-amount ${transaction.type}`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </div>
                  </div>
                  <div className="transaction-actions">
                    <button onClick={() => startEdit(transaction)} className="btn-edit">
                      Edit
                    </button>
                    <button onClick={() => onDeleteTransaction(transaction.id)} className="btn-delete">
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;