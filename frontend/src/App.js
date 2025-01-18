import React, { useState } from "react";
import AddCategory from "./components/AddCategory";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";

function App() {
  const [reload, setReload] = useState(false);

  const handleReload = () => setReload(!reload);

  return (
    <div className="container">
      <h1>Wallet App</h1>
      <AddCategory onCategoryAdded={handleReload} />
      <AddTransaction onTransactionAdded={handleReload} />
      <TransactionList key={reload} />
    </div>
  );
}

export default App;
