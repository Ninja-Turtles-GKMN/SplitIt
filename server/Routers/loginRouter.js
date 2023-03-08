const express = require('express');
const loginRouter = express.Router();
const loginMiddleware = require('../Middleware/loginMiddleware.js');
// const db = require('../models/splitItModels.js');

loginRouter.get('/', loginMiddleware.login, (req, res) => {
  res.status(200).json('User successfully logged in');
});

loginRouter.post('/', loginMiddleware.register, (req, res) => {
  res.status(200).json('User successfully registered');
});

module.exports = loginRouter;
