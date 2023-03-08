const express = require('express');
const expenseRouter = express.Router();
// const db = require('../models/splitItModels.js');
const expenseMiddleware = require('../controllers/expenseMiddleware.js');

// when page render, send get request to localhost3000/expense/ to load all debtors
expenseRouter.get('/', expenseMiddleware.getDebtor, (req, res) => {
  res.status(200).json(res.locals.alldebtor);
});

//Send post request to localhost3000/expense/ to add a new expense event
expenseRouter.post('/', expenseMiddleware.addExpense, (req, res) => {
  res.status(200).json('Successfully add expense');
});

//Send patch request to localhost3000/expense/ to mark one debt as paid
expenseRouter.patch('/', expenseMiddleware.payDebt, (req, res) => {
  res.status(200).json('Successfully get all expense');
});

module.exports = expenseRouter;
