const sql = require('../models/splitItModels');

module.exports = {
  addExpense: async (req, res, next) => {
    const { host, event, date, amount, payer } = req.body;
    let payerArray = [];
    const splitAmount = amount / payer.length;
    let expense_id = 0;
    try {
      //get information about all people who attand the event

      for (let i = 0; i < payer.length; i++) {
        let checkUser = await sql.query(
          `SELECT user_id FROM users WHERE username = '${payer[i]}'`
        );
        console.log(checkUser.rows);
        if (checkUser.rows[0]) {
          payerArray.push(checkUser.rows[0].user_id);
        } else {
          console.log('User does not exist');
        }
      }

      //get information about who host the event
      let hostId = await sql.query(
        `SELECT user_id FROM users WHERE username = '${host}'`
      );
      hostId = hostId.rows[0].user_id;
      //take off the host from payerlist which will be inserted into the debt table later
      payerArray = payerArray.filter((id) => id !== hostId);
      let insertExpense = await sql.query(
        `INSERT INTO expenses (event, date, amount )
           VALUES ($1, $2, $3) RETURNING expense_id`,
        [event, date, amount]
      );
      const expense_id = insertExpense.rows[0].expense_id;

      for (let j = 0; j < payerArray.length; j++) {
        let insertDebt = await sql.query(
          `INSERT INTO debts (expense_id, host_id , debtor_id, amount_owned )
        VALUES ($1, $2, $3, $4) `,
          [expense_id, hostId, payerArray[j], splitAmount]
        );
        console.log(insertDebt);
      }
    } catch (err) {
      console.log(err);
      //   next(err);
    }

    // sql
    //   .query(
    //     `INSERT INTO expenses (event, date, amount )
    //        VALUES ($1, $2, $3) RETURNING expense_id`,
    //     [event, date, amount]
    //   )
    //   .then((data) => {
    //     expense_id = data.rows[0].expense_id;
    //   })
    //   .catch((err) => console.log(err));

    // payerArray.forEach((debtor) => {
    //   sql
    //     .query(
    //       `INSERT INTO expenses (event, date, amount )
    //        VALUES ($1, $2, $3) RETURNING expense_id`,
    //       [event, date, amount]
    //     )
    //     .then((data) => {
    //       expense_id = data.rows[0].expense_id;
    //     })
    //     .catch((err) => console.log(err));
    // });
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
{
    "host": "Garrett",
"event": "Dinner",
"date": "2023-03-07",
"amount":100,
"payer":["Garrett", "Nic"]
}

{"host": "Garrett",
"event": "celebration",
"payer":"Nic"}
*/
