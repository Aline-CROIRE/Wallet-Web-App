const express = require("express");
const router = express.Router();
const Transaction = require("./models/transaction");


router.post("/", async (req, res) => {
  try {
    const { userId, amount, type, category, account, description } = req.body;
    if (!account) return res.status(400).json({ message: "Account is required." });

    const transaction = new Transaction({ userId, amount, type, category, account, description });
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

router.get("/", async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let filter = {};
    if (startDate && endDate) {
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const transactions = await Transaction.find(filter).populate("category");
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
