const sql = require('../models/splitItModels');

console.log(sql.query);
module.exports = {
  addExpense: (req, res, next) => {
    const { description, event, amount, payer } = req.body;
    console.log(req.body);
    next();
  },
  payDebt: (req, res, next) => {
    const { payer, host, event } = req.body;
    console.log(req.body);
    next();
  },
};

/*
{"description": "dinner",
"event": "celebration",
"amount":100,
"payer":"Garrett, Nic"}
*/
