import React, { useState, useEffect } from "react";
import AddCategory from "./components/AddCategory";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import { fetchCategories, fetchTransactions } from './services/api'; // Import your API functions

function App() {
  const [reload, setReload] = useState(false);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const handleReload = () => setReload(!reload);

  // Fetch categories and transactions when the component mounts or reloads
  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await fetchCategories();
        const transactionsData = await fetchTransactions();
        setCategories(categoriesData.data); // Adjust based on your API response structure
        setTransactions(transactionsData.data); // Adjust based on your API response structure
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    loadData();
  }, [reload]); // Dependency on reload state

  return (
    <div className="container">
      <h1>Wallet App</h1>
      <AddCategory onCategoryAdded={handleReload} />
      <AddTransaction onTransactionAdded={handleReload} />
      <TransactionList key={reload} transactions={transactions} categories={categories} />
    </div>
  );
}

export default App;
