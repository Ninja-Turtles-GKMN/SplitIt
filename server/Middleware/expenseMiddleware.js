const sql = require('../models/splitItModels');

module.exports = {
  addExpense: (req, res, next) => {
    const { event, date, amount, payer } = req.body;
    console.log(event);
    const payerArray = [];
    payer.forEach((name) => {
      sql
        .query(`SELECT user_id FROM users WHERE username = '${name}'`)
        .then((data) => {
          if (data.rows) {
            payerArray.push(data.rows);
          } else {
            next('users not existed');
          }
        })
        .catch((err) => console.log(err));
    });

    sql
      .query(
        `WITH data(event, date, amount, payer) AS (
        VALUES                              
           ('${event}', '${data}', ${amount}, '${payer}') 
                       
        )
     , ins1 AS (
        INSERT INTO expenses (event, date, amount)
        SELECT event, data, amount        
        FROM   data
        RETURNING event, data, amount
        )
     , ins2 AS (
        INSERT INTO debts (payer)
        SELECT payer
        FROM   data 
        JOIN   ins1 USING (firstname, lastname)
        RETURNING sample_id, user_id
        )
     `
      )

      // sql
      //   //   .query(`SELECT * FROM expenses`)
      //   .query(
      //     `INSERT INTO expenses (event, date, amount )
      //      VALUES ('${event}', '${date}', ${amount});`
      //   )
      .then((data) => {
        console.log('datarows', data.rows);
        next();
      })
      .catch((err) => console.log(err));
  },
  payDebt: (req, res, next) => {
    const { payer, host, event } = req.body;
    sql.query(
      `UPDATE debts SET is_paid = true WHERE debtor_id = '${host}' AND creditor_id = '${payer}'`
    );
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
