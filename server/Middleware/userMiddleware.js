const db = require('../models/splitItModels.js');

module.exports = {
  register: (req, res, next) => {
    const { username, password, email } = req.body;
    next();
  },
  login: (req, res, next) => {
    const { username, password } = req.body;
    next();
  },
};
