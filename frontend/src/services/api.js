import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const fetchCategories = () => API.get("/categories");
export const createCategory = (category) => API.post("/categories", category);

export const fetchTransactions = () => API.get("/transactions");
export const createTransaction = (transaction) => API.post("/transactions", transaction);
