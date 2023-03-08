const sql = require('../models/splitItModels.js');

module.exports = {
  register: (req, res, next) => {
    const { username, password, email } = req.body;

    //hash username, password here before insert into database
    //newUsername = username.bcrypt
    //newPassword = password.bcrypt
    sql
      .query(
        `INSERT INTO users (username, password, email )
       VALUES ('${username}', '${password}','${email});`
      )
      .then((data) => {
        console.log('datarows', data.rows);
        next();
      })
      .catch((err) => console.log(err));
  },

  login: (req, res, next) => {
    const { username, password } = req.body;
    //hash the username here because both username and password from database are hashed

    sql
      .query(`SELECT * FROM users WHERE username = '${username}'`)
      .then((data) => {
        user = data.rows[0];
        const userpassword = user.password;
        //compare the password from database with the password from user here, should be hashed
        if (user && bcrypt.compare(password, userpassword)) {
          next();
        } else {
          next('Please enter valid username and password');
        }
      })
      .catch((err) => console.log(err));
  },
};
