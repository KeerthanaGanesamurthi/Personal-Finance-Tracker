import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import { getTransactions, saveTransactions } from './utils/storage';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const savedTransactions = getTransactions();
    setTransactions(savedTransactions);
  }, []);

  const addTransaction = (transaction) => {
    const newTransactions = [...transactions, { ...transaction, id: Date.now() }];
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  const updateTransaction = (id, updatedTransaction) => {
    const newTransactions = transactions.map(t => 
      t.id === id ? { ...updatedTransaction, id } : t
    );
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  const deleteTransaction = (id) => {
    const newTransactions = transactions.filter(t => t.id !== id);
    setTransactions(newTransactions);
    saveTransactions(newTransactions);
  };

  const filteredTransactions = transactions
    .filter(transaction => {
      if (filter === 'all') return true;
      return transaction.type === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'amount') return b.amount - a.amount;
      return a.category.localeCompare(b.category);
    });

  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="main-content">
          <div className="left-panel">
            <TransactionForm onAddTransaction={addTransaction} />
            <SummaryCards transactions={transactions} />
          </div>
          <div className="right-panel">
            <Charts transactions={transactions} />
            <TransactionList
              transactions={filteredTransactions}
              onUpdateTransaction={updateTransaction}
              onDeleteTransaction={deleteTransaction}
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;