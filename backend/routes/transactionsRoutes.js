const express = require("express");
const router = express.Router();
const Transaction = require("../models/transaction");


// Add a new transaction
router.post("/", async (req, res) => {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("category");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
