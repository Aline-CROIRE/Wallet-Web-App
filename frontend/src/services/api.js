import axios from "axios";

// Create an Axios instance with a base URL
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Fetch all categories
export const fetchCategories = () => API.get("/categories");

// Create a new category
export const createCategory = (category) => API.post("/categories", category);

// Fetch all transactions
export const fetchTransactions = () => API.get("/transactions");

// Create a new transaction
export const createTransaction = (transaction) => API.post("/transactions", transaction);

// Fetch dashboard data
export const fetchDashboard = () => API.get("/dashboard"); // Corrected endpoint and function name
