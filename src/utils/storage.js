const STORAGE_KEY = 'finance_tracker_transactions';

export const getTransactions = () => {
  try {
    const transactions = localStorage.getItem(STORAGE_KEY);
    return transactions ? JSON.parse(transactions) : [];
  } catch (error) {
    console.error('Error loading transactions:', error);
    return [];
  }
};

export const saveTransactions = (transactions) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  } catch (error) {
    console.error('Error saving transactions:', error);
  }
};