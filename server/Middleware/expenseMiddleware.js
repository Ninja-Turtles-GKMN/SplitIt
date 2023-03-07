const sql = require('../models/splitItModels');

module.exports = {
  addExpense: (req, res, next) => {
    const { event, date, amount, payer } = req.body;
    console.log(event);

    sql
      //   .query(`SELECT * FROM expenses`)
      .query(
        `INSERT INTO expenses (description, date, total_amount, payer_id )
         VALUES ('${event}', '${date}',${amount},${payer});`
      )
      .then((data) => {
        console.log('datarows', data.rows);
        next();
      })
      .catch((err) => console.log(err));
  },
  payDebt: (req, res, next) => {
    const { payer, host, event } = req.body;
    console.log(req.body);
    next();
  },
};

/*
{"event": "Dinner",
"date": "2023-03-07",
"amount":100,
"payer":"Garrett, Nic"}

{"host": "Garrett",
"event": "celebration",
"payer":"Nic"}
*/
