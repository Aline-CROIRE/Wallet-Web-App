import React, { useEffect, useState } from "react";
import { fetchTransactions } from "../services/api";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const loadTransactions = async () => {
      const response = await fetchTransactions();
      setTransactions(response.data);
    };
    loadTransactions();
  }, []);

  return (
    <div>
      <h3>Transaction List</h3>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Type</th>
            <th>Account</th>
            <th>Category</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.account}</td>
              <td>{transaction.category?.name || "N/A"}</td>
              <td>{transaction.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
