import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";

const TransactionList = ({ transactions, onDateFilter }) => {
  // Define state for date filtering
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Handle date filtering
  const handleFilter = () => {
    if (startDate && endDate) {
      onDateFilter(startDate, endDate); // Call parent handler with dates
    }
  };

  // PDF Export Function
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transactions Report", 10, 10);

    const tableData = transactions.map((txn) => [
      txn.amount,
      txn.description,
      txn.type,
      txn.category,
      txn.account,
    ]);

    doc.autoTable({
      head: [["Amount", "Description", "Type", "Category", "Account"]],
      body: tableData,
    });

    doc.save("transactions-report.pdf");
  };

  // CSV Headers
  const headers = [
    { label: "Amount", key: "amount" },
    { label: "Description", key: "description" },
    { label: "Type", key: "type" },
    { label: "Category", key: "category" },
    { label: "Account", key: "account" },
  ];

  return (
    <div>
      <h3>Transaction List</h3>

      {/* Date Filter */}
      <div>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={handleFilter}>Filter</button>
      </div>

      {/* Table of Transactions */}
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Description</th>
            <th>Type</th>
            <th>Category</th>
            <th>Account</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>${txn.amount.toFixed(2)}</td>
              <td>{txn.description}</td>
              <td>{txn.type}</td>
              <td>{txn.category}</td>
              <td>{txn.account}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Export Buttons */}
      <div>
        <button onClick={exportPDF}>Export PDF</button>
        <CSVLink
          data={transactions}
          headers={headers}
          filename="transactions-report.csv"
          className="btn"
        >
          Export CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default TransactionList;
