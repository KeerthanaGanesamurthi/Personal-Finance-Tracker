import React from 'react';

const SummaryCards = ({ transactions }) => {
  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expenses += transaction.amount;
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  const balance = summary.income - summary.expenses;

 const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
};

  return (
    <div className="summary-cards">
      <div className="summary-card balance">
        <div className="card-icon">💰</div>
        <div className="card-content">
          <h3>Current Balance</h3>
          <p className={`amount ${balance >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(balance)}
          </p>
        </div>
      </div>

      <div className="summary-card income">
        <div className="card-icon">📈</div>
        <div className="card-content">
          <h3>Total Income</h3>
          <p className="amount positive">{formatCurrency(summary.income)}</p>
        </div>
      </div>

      <div className="summary-card expense">
        <div className="card-icon">📉</div>
        <div className="card-content">
          <h3>Total Expenses</h3>
          <p className="amount negative">{formatCurrency(summary.expenses)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;