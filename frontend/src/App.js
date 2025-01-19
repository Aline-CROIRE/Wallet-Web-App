import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import AddCategory from "./components/AddCategory";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import Reports from "./components/Reports"; // Import your Reports component
import Notifications from "./components/Notifications"; // Import your Notifications component
import Dashboard from "./components/Dashboard"; // Import your Dashboard component
import { fetchCategories, fetchTransactions } from './services/api'; // Import your API functions

function App() {
  const [reload, setReload] = useState(false);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const handleReload = () => setReload(!reload);

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
  }, [reload]);

  return (
    <Router>
      <div className="container">
        <h1>Wallet App</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/reports">Reports</Link>
            </li>
            <li>
              <Link to="/notifications">Notifications</Link>
            </li>
          </ul>
        </nav>
        <AddCategory onCategoryAdded={handleReload} />
        <AddTransaction onTransactionAdded={handleReload} />
        
        <Routes>
  <Route path="/" element={<TransactionList key={reload} transactions={transactions} categories={categories} />} />
  <Route path="/reports" element={<Reports />} />
  <Route path="/notifications" element={<Notifications />} />
  <Route path="/dashboard" element={<Dashboard />} />
</Routes>

      </div>
    </Router>
  );
}

export default App;
