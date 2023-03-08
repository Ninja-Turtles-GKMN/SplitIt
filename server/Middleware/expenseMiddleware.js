const sql = require('../models/splitItModels');

module.exports = {
  getDebtor: async (req, res, next) => {
    let alldebtor = await sql.query(
      `SELECT debts.debtor_id, debts.amount_owned, debts.expense_id, users.username 
      FROM debts, users 
      WHERE debts.debtor_id =users.user_id
      AND debts.is_paid =false`
    );
    alldebtor = alldebtor.rows;
    console.log(alldebtor);

    res.locals.alldebtor = alldebtor;
    next();
  },

  //new query TITLE, COST, DATE, ALL PARTICIPANTS
  getAllEvents: async (req, res, next) => {
    console.log('hello')
    let allEvents = await sql.query(
      `SELECT e.event, to_char(e.date, 'MM-DD-YYYY') as formatted_date, e.amount, 
      string_agg(u.username, ', ' ORDER BY u.user_id) AS users 
      FROM expenses e 
      JOIN debts d ON e.expense_id = d.expense_id 
      JOIN users u ON u.user_id IN (d.host_id, d.debtor_id) 
      GROUP BY e.expense_id;`
    );
    allEvents = allEvents.rows;
    console.log(allEvents);

    res.locals.allEvents = allEvents;
    next();
  },


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
      }
      next();
    } catch (err) {
      console.log(err);
      //   next(err);
    }
  },

  payDebt: async (req, res, next) => {
    const { debtor_id, host, expense_id } = req.body;
    try {
      let payDebt = await sql.query(
        `UPDATE debts SET is_paid = true
        WHERE expense_id = '${expense_id}' AND debtor_id = '${debtor_id}'
        RETURNING *`
      );
      console.log(payDebt.rows);
      res.locals = payDebt.rows;
      next();
    } catch (err) {
      console.log(err);
    }
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
