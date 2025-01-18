import React, { useState, useEffect } from "react";
import { createTransaction, fetchCategories } from "../services/api";

const AddTransaction = ({ onTransactionAdded }) => {
  const [categories, setCategories] = useState([]);
  const [transaction, setTransaction] = useState({
    userId: "12345",
    amount: "",
    type: "expense",
    account: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    const loadCategories = async () => {
      const response = await fetchCategories();
      setCategories(response.data);
    };
    loadCategories();
  }, []);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTransaction(transaction);
      onTransactionAdded();
      setTransaction({
        userId: "12345",
        amount: "",
        type: "expense",
        account: "",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Transaction</h3>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={transaction.amount}
        onChange={handleChange}
        required
      />
      <select name="type" value={transaction.type} onChange={handleChange}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input
        type="text"
        name="account"
        placeholder="Account"
        value={transaction.account}
        onChange={handleChange}
        required
      />
      <select
        name="category"
        value={transaction.category}
        onChange={handleChange}
        required
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <textarea
        name="description"
        placeholder="Description"
        value={transaction.description}
        onChange={handleChange}
      ></textarea>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTransaction;
