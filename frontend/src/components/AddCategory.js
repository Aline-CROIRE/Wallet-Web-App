import React, { useState } from "react";
import { createCategory } from "../services/api";

const AddCategory = ({ onCategoryAdded }) => {
  const [name, setName] = useState("");
  const [subcategories, setSubcategories] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subcategoriesArray = subcategories.split(",").map((s) => s.trim());
    const category = { name, subcategories: subcategoriesArray };
    try {
      await createCategory(category);
      onCategoryAdded();
      setName("");
      setSubcategories("");
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Category</h3>
      <input
        type="text"
        placeholder="Category Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Subcategories (comma-separated)"
        value={subcategories}
        onChange={(e) => setSubcategories(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddCategory;
