const express = require('express');
const expenseRouter = express.Router();
// const db = require('../models/splitItModels.js');
const expenseMiddleware = require('../Middleware/expenseMiddleware.js');

expenseRouter.post('/', expenseMiddleware.addExpense, (req, res) => {
  res.status(200).json('Successfully add expense');
});

expenseRouter.patch('/', expenseMiddleware.payDebt, (req, res) => {
  res.status(200).json('Successfully get all expense');
});

module.exports = expenseRouter;
