import React, { useState } from "react";

const Budget = () => {
  const [budget, setBudget] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Budget saved:", budget);
    // Save budget to backend if needed
  };

  return (
    <div>
      <h2>Set Your Monthly Budget</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Enter budget"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Budget;
