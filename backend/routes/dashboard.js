const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Dashboard Route
router.get('/', async (req, res) => {
  try {
    // Total expenses
    const totalExpenses = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Total income
    const totalIncome = await Transaction.aggregate([
      { $match: { type: 'income' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    // Expense breakdown by category
    const expenseByCategory = await Transaction.aggregate([
      { $match: { type: 'expense' } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
    ]);

    // Construct the dashboard data
    const dashboardData = {
      totalExpenses: totalExpenses[0] ? totalExpenses[0].total : 0,
      totalIncome: totalIncome[0] ? totalIncome[0].total : 0,
      expenseByCategory,
    };

    res.json(dashboardData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
