import React, { useEffect, useState } from "react";
import axios from "axios";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0, balance: 0 });
  const [categorySummary, setCategorySummary] = useState({});

  useEffect(() => {
    // Fetch transactions from the API
    axios
      .get("http://localhost:5000/api/transactions")
      .then((response) => {
        setTransactions(response.data);
        calculateSummary(response.data);
      })
      .catch((error) => console.error("Error fetching transactions:", error));
  }, []);

  const calculateSummary = (transactions) => {
    let income = 0;
    let expense = 0;
    const categoryBreakdown = {};

    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        income += transaction.amount;
      } else if (transaction.type === "Expense") {
        expense += transaction.amount;
      }

      // Update category breakdown
      if (transaction.category) {
        if (!categoryBreakdown[transaction.category.name]) {
          categoryBreakdown[transaction.category.name] = 0;
        }
        categoryBreakdown[transaction.category.name] += transaction.amount;
      }
    });

    setTotals({
      income,
      expense,
      balance: income - expense,
    });

    setCategorySummary(categoryBreakdown);
  };

  return (
    <div className="container">
      <h1>Transaction Reports</h1>
      <div className="summary">
        <div className="summary-item">
          <h3>Total Income</h3>
          <p>${totals.income.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Total Expense</h3>
          <p>${totals.expense.toFixed(2)}</p>
        </div>
        <div className="summary-item">
          <h3>Balance</h3>
          <p>${totals.balance.toFixed(2)}</p>
        </div>
      </div>
      <h2>Category Breakdown</h2>
      <ul className="category-breakdown">
        {Object.keys(categorySummary).map((category) => (
          <li key={category}>
            {category}: ${categorySummary[category].toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
