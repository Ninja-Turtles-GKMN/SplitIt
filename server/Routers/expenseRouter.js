const express = require('express');
const expenseRouter = express.Router();
const db = require('../models/splitItModels.js');

expenseRouter.get('/', (req, res) => {
  res.status(200).json('Successfully get all expense');
});

expenseRouter.post('/', (req, res) => {
  res.status(200).json('Successfully add expense');
});

module.exports = expenseRouter;
