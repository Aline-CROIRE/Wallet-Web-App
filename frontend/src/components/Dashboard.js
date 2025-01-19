import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategories } from './features/categorySlice';
import { setTransactions } from './features/transactionSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const transactions = useSelector((state) => state.transaction.transactions);

  useEffect(() => {
    // Fetch data from API and dispatch
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => dispatch(setCategories(data)));

    fetch('/api/transactions')
      .then((res) => res.json())
      .then((data) => dispatch(setTransactions(data)));
  }, [dispatch]);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>{cat.name}</li>
        ))}
      </ul>
      <h1>Transactions</h1>
      <ul>
        {transactions.map((txn) => (
          <li key={txn.id}>{txn.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
