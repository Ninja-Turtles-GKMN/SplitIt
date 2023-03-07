const sql = require('../models/splitItModels');

console.log(sql.query);
module.exports = {
  addExpense: (req, res, next) => {
    const { event, data, amount, payer } = req.body;
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
{"event": "dinner",
"data": "2023-03-07",
"amount":100,
"payer":"Garrett, Nic"}

{"host": "Garrett",
"event": "celebration",
"payer":"Nic"}
*/
