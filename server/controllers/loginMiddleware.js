const sql = require('../models/splitItModels.js');
const bcrypt = require('bcrypt');

module.exports = {
  register: (req, res, next) => {
    //const { username, password, email } = req.body;
    const { username, email } = req.body;
    //const username = res.locals.hashUN
    const password = res.locals.hashPW;

    //hash username, password here before insert into database
    //newUsername = username.bcrypt
    //newPassword = password.bcrypt
    sql
      .query(
        `INSERT INTO users (username, password, email)
       VALUES ('${username}','${password}','${email}');`
      )
      .then((data) => {
        console.log('datarows', data.rows);
        next();
      })
      .catch((err) => console.log(err));
  },

  login: (req, res, next) => {
    console.log('in the login route');
    const { username, password } = req.body;
    //hash the username here because both username and password from database are hashed

    sql
      .query(`SELECT * FROM users WHERE username = '${username}'`)
      .then((data) => {
        const user = data.rows[0];
        const userpassword = user.password;
        //compare the password from database with the password from user here, should be hashed
        console.log('user', user);
        console.log('in login');
        if (user && bcrypt.compare(password, userpassword)) {
          next();
        } else {
          next({
            log: 'Incorrect username or password',
            status: 401,
            message: { err: 'incorrect username or password' },
          });
        }
      })
      .catch((err) => {
        next({
          log: 'Incorrect username or password',
          status: 401,
          message: { err: 'incorrect username or password' },
        });
      });
  },
};
