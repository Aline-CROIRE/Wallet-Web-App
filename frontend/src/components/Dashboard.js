import React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify'; // Ensure this is imported
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Ensure this is installed
import { selectCategories } from '../features/categorySlice'; // Adjust the import path
import { selectTransactions } from '../features/transactionSlice'; // Adjust the import path

const Dashboard = () => {
  const categories = useSelector(selectCategories);
  const transactions = useSelector(selectTransactions);

  const exportPDF = () => {
    const doc = new jsPDF();
    const headers = [["Header 1", "Header 2", "Header 3"]]; // Define your headers here
    doc.autoTable({
      head: headers,
      body: transactions.map(trans => [trans.field1, trans.field2, trans.field3]), // Adjust based on your transaction fields
    });
    doc.save("transactions.pdf");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={exportPDF}>Export PDF</button>
      <ToastContainer />
      {/* Render categories and transactions as needed */}
    </div>
  );
};

export default Dashboard;
