const sql = require('../models/splitItModels.js');

module.exports = {
  register: (req, res, next) => {
    const { username, password, email } = req.body;
    sql
      .query(
        `INSERT INTO users (username, password, email )
       VALUES ('${username}', '${password}',${email});`
      )
      .then((data) => {
        console.log('datarows', data.rows);
        next();
      })
      .catch((err) => console.log(err));

    next();
  },
  login: (req, res, next) => {
    const { username, password } = req.body;
    next();
  },
};
