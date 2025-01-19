require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const transactionsRoutes = require("./routes/transactionsRoutes");
const categoryRoutes = require("./routes/categoryRoutes");

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());


const mongoose = require("mongoose");

// Database Connection

const dbURI = 'mongodb://localhost:27017/'; // Replace with your actual URI
console.log('Connecting to database with URI:', dbURI);

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected!'))
    .catch(err => console.error('Database connection error:', err));


// Routes
app.get("/", (req, res) => {
  res.send("Wallet App API is running!");
});

app.use("/api/transactions", transactionsRoutes);
app.use("/api/categories", categoryRoutes);
app.use('/api/dashboard', require('./routes/dashboard'));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
